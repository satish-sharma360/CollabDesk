import mongoose, { mongo } from "mongoose";

const roomSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    speakers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        required: false,
    }
}, { timestamps: true })

export default mongoose.model('room', roomSchema)