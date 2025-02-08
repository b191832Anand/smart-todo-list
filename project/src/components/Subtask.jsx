import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Subtask = () => {
  const { task_id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  const fetchAllSubtasks = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/allsubtask/${task_id}`);
      setSubtasks(data);
    } catch (e) {
      toast.error("Error fetching subtasks");
    }
  };

  useEffect(() => {
    fetchAllSubtasks();
  }, []);

  const addSubtask = async (e) => {
    e.preventDefault();
    if (!subject.trim()) {
      toast.error("Enter a valid subject");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/addsubtask', { task_id, subject });
      toast.success("Subtask added");
      setSubject('');
      fetchAllSubtasks();
    } catch (e) {
      toast.error(e.response?.data || "Error adding subtask");
    }
  };

  const toggleMarkSubtask = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/togglesubtask/${id}`, {completed: !completed });
      fetchAllSubtasks();
      toast.success("updated successfully")
    } catch (e) {
      console.log(e);
      
      toast.error(e.response.data);
    }
  };

  const deleteSubtask = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletesubtask`,{data:{_id}});
      fetchAllSubtasks();
      toast.success("deleted successfully") 
    } catch (e) {
      toast.error("Error deleting subtask");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
      >
        Back to Dashboard
      </button>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <form action="" onSubmit={addSubtask}>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Subtasks</h2>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subtask"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type='submit'
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
        </form>
        <ul className="mt-4">
          {subtasks.map((subtask) => (
            <li key={subtask._id} className="p-2 bg-gray-200 border border-gray-200 mt-2 rounded-lg flex justify-between items-center shadow-lg">
              <span className={subtask.completed ? "line-through text-gray-500" : ""}>{subtask.subject}</span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleMarkSubtask(subtask._id, subtask.completed)}
                  className={`px-2 py-1 rounded-md text-white ${subtask.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {subtask.completed ? "Unmark" : "Mark"}
                </button>
                <button
                  onClick={() => deleteSubtask(subtask._id)}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Subtask;
