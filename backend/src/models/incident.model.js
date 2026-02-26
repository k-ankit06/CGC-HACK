import mongoose, { Schema } from "mongoose";

const incidentSchema = new Schema({
    incidentId: {
        type: String,
        required: true,
        unique: true,
        default: () => `INC-${Date.now().toString().slice(-6)}`
    },
    type: {
        type: String,
        required: true,
        enum: ['Medical Emergency', 'Theft', 'Lost Tourist', 'Language Barrier', 'Accident', 'Harassment', 'Other']
    },
    
    tourist: {
        type: Schema.Types.ObjectId,
        ref: "Tourist"
    },
    touristName: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    severity: {
        type: String,
        required: true,
        enum: ['Critical', 'High', 'Medium', 'Low']
    },
    status: {
        type: String,
        required: true,
        enum: ['In Progress', 'Investigating', 'Resolved', 'Closed'],
        default: 'In Progress'
    },
    description: { type: String, required: true },
  
    responseTeam: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    },
    reportingOfficer: { type: String }

}, { timestamps: true });

export const Incident = mongoose.model("Incident", incidentSchema);