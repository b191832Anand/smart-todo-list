import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    task_id: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }   
});

export default mongoose.model("Subtask", subtaskSchema);
