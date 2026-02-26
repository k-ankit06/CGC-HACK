import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: {
        type: String,
        required: true,
        enum: ['Medical', 'Police', 'Patrol', 'Support']
    },
    members: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Available', 'On Duty', 'Off Duty'],
        default: 'Available'
    },
    location: { type: String, required: true },
 
    currentAssignment: {
        type: Schema.Types.ObjectId,
        ref: "Incident",
        default: null
    },
    avgResponseTime: { type: String }, 
    contact: { type: String, required: true }

}, { timestamps: true });

export const Team = mongoose.model("Team", teamSchema);