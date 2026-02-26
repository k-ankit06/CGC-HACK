import mongoose, { Schema } from "mongoose";


const groupMemberSchema = new Schema({
    fullName: { type: String, required: true },
    gender: { type: String },
    dateOfBirth: { type: String },
    touristType: { type: String, enum: ['international', 'domestic'], default: 'international' },
    passportNumber: { type: String },
    aadhaarNumber: { type: String },
    bloodGroup: { type: String },
}, { _id: false });

const touristSchema = new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    
    touristId: { type: String, required: true, unique: true },
    dateOfBirth: { type: String },
    gender: { type: String },
    nationality: { type: String },
    address: { type: String },
    touristType: { type: String, enum: ['international', 'domestic'], default: 'international' },
    passportNumber: { type: String },
    aadhaarNumber: { type: String },

   
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    emergencyContactRelation: { type: String },

  
    hotelName: { type: String },
    hotelAddress: { type: String },
    checkInDate: { type: String },
    checkOutDate: { type: String },
    purposeOfVisit: { type: String },

    
    bloodGroup: { type: String },
    medicalConditions: { type: String },
    allergies: { type: String },

   
    group: [groupMemberSchema],

}, { timestamps: true });

export const Tourist = mongoose.model("Tourist", touristSchema);