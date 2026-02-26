import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { User } from "../../../models/user.model.js";
import { sendEmail } from "../../../services/mail.service.js";


const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password, role } = req.body;

    if ([fullName, email, password, role].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

   
    const user = await User.create({ fullName, email, password, role });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    

    console.log("User created. Attempting to send email...");

    try {
        const subject = "🎉 New User Registration on UTSE!";
        const htmlBody = `
            <h1>New User Alert!</h1>
            <p>A new user has just signed up on the UTSE platform.</p>
            <ul>
                <li><strong>Name:</strong> ${fullName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Role:</strong> ${role}</li>
            </ul>
        `;

        await sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: subject,
            html: htmlBody,
        });

        console.log("Admin notification email process completed.");
    } catch (emailError) {
      
        console.error("!!! FAILED TO SEND ADMIN NOTIFICATION EMAIL !!!");
        console.error(emailError);
    }

    
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User with this email does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const accessToken = user.generateAccessToken();
    const loggedInUser = await User.findById(user._id).select("-password");

    const options = { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production'
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken }, "User logged In Successfully"));
});


const logoutUser = asyncHandler(async (req, res) => {
    const options = { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production' 
    };
    
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out Successfully"));
});


const getCurrentUser = asyncHandler(async(req, res) => {
    
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getCurrentUser 
};