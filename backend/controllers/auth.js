import todo from '../model/model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import task from '../model/task.js';
import subtask from '../model/subtask.js';

dotenv.config();

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const exist = await todo.findOne({ email });

        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const val = new todo({ username, email, password });
        await val.save();

        return res.status(200).json({ message: "Signup successful" });
    } catch (e) {
        console.error("Signup error:", e);
        return res.status(500).json({ message: "Error while signing up" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await todo.findOne({ email });

        if (!exist || password !== exist.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: exist.id },"1925112816", { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (e) {
        console.error("Login error:", e);
        return res.status(500).json({ message: "Error while logging in" });
    }
};

const profile = async (req, res) => {
    try {
        const { id } = req.user;
        const exist = await todo.findById(id);

        if (!exist) return res.status(400).json({ message: "User not found" });

        return res.status(200).json(exist);
    } catch (e) {
        console.error("Profile fetch error:", e);
        return res.status(500).json({ message: "Error in fetching profile" });
    }
};

const addtask = async (req, res) => {
    try {
        const to_id = req.user.id;
        const { subject, date } = req.body;

        if (!subject || !date) {
            return res.status(400).json({ message: "Subject and date are required" });
        }

        const add = new task({ to_id, subject, date });
        await add.save();

        return res.status(200).json({ message: "Task added successfully" });
    } catch (e) {
        console.error("Task addition error:", e);
        return res.status(500).json({ message: "Error in adding task" });
    }
};

const particulartask = async (req, res) => {
    try {
        const id = req.user.id;
        const all = await task.find({ to_id: id });
        return res.status(200).json(all);
    } catch (e) {
        console.error("Task fetch error:", e);
        return res.status(500).json({ message: "Error in fetching tasks" });
    }
};

const deletetask = async (req, res) => {
    try {
        const taskid = req.params.id;
        await task.findByIdAndDelete(taskid);
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (e) {
        console.error("Task deletion error:", e);
        return res.status(500).json({ message: "Error while deleting task" });
    }
};

const updatetask = async (req, res) => {
    try {
        const { completed } = req.body;
        const taskid = req.params.id;
        await task.findByIdAndUpdate(taskid, { completed }, { new: true });
        return res.status(200).json({ message: "Updated the task" });
    } catch (e) {
        console.error("Task update error:", e);
        return res.status(500).json({ message: "Error while updating task" });
    }
};

const addsubtask = async (req, res) => {
    try {
        const { task_id, subject } = req.body;
        const all = new subtask({ task_id, subject });
        await all.save();
        return res.status(200).json({ message: "Subtask added successfully" });
    } catch (e) {
        console.error("Subtask addition error:", e);
        return res.status(500).json({ message: "Error in adding subtask" });
    }
};

const allsubtask = async (req, res) => {
    try {
        const task_id = req.params.task_id;
        const all = await subtask.find({ task_id });
        return res.status(200).json(all);
    } catch (e) {
        console.error("Error fetching subtasks:", e);
        return res.status(500).json({ message: "Error in fetching subtasks" });
    }
};

const togglesubtask = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        const updatedSubtask = await subtask.findByIdAndUpdate(
            id, 
            { completed:completed}, 
            { new: true }
        );

        if (!updatedSubtask) {
            return res.status(404).json({ message: "Subtask not found" });
        }

        return res.status(200).json({ message: "Updated successfully", subtask: updatedSubtask });
    } catch (e) {
        console.error("Error while toggling subtask:", e);
        return res.status(500).json({ message: "Error while toggling subtask" });
    }
};

const deletesubtask = async (req, res) => {
    try {
        const { _id } = req.body;
        if(!_id){
            return res.status(400).send("error")
        }
        await subtask.findByIdAndDelete(_id);
        return res.status(200).json({ message: "Subtask deleted successfully" });
    } catch (e) {
        console.error("Error deleting subtask:", e);
        return res.status(500).json({ message: "Error deleting subtask" });
    }
};

export { signup, login, profile, addtask, particulartask, deletetask, updatetask, addsubtask, allsubtask, togglesubtask, deletesubtask };
