import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://smart-todo-list-two.vercel.app/api/particulartask', {
        headers: { 'x-token': localStorage.getItem('token') },
      });
      const fetchedTasks = Array.isArray(response.data) ? response.data : response.data.tasks || [];
      setTasks(fetchedTasks);
      fetchedTasks.forEach((task) => {
        if (new Date(task.date) < new Date()) {
          deleteTask(task._id, 0);
        }
      });
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !date) {
      toast.error('Please enter a subject and a date');
      return;
    }
    if (new Date(date) < new Date()) {
      toast.error('Enter a valid date');
      return;
    }
    try {
      await axios.post(
        'https://smart-todo-list-two.vercel.app/api/addtask',
        { subject, date, completed: false },
        { headers: { 'x-token': localStorage.getItem('token') } }
      );
      toast.success('Task added successfully');
      setSubject('');
      setDate('');
      fetchTasks();
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };

  const deleteTask = async (id, val) => {
    try {
      await axios.delete(`https://smart-todo-list-two.vercel.app/api/deletetask/${id}`, {
        headers: { 'x-token': localStorage.getItem('token') },
      });
      if (val === 1) toast.success('Deleted successfully');
      fetchTasks();
    } catch (e) {
      console.error('Error deleting task:', e);
    }
  };

  const toggleCompletion = async (id, completed) => {
    try {
      await axios.put(
        `https://smart-todo-list-two.vercel.app/api/updatetask/${id}`,
        { completed: !completed },
        { headers: { 'x-token': localStorage.getItem('token') } }
      );
      toast.success(completed ? 'Marked as incomplete' : 'Marked as complete');
      fetchTasks();
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      if (filter === 'closest') return true;
      return true;
    })
    .sort((a, b) => (filter === 'closest' ? new Date(a.date) - new Date(b.date) : 0));

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="mt-10 w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <form onSubmit={addTask}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter the subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Add Task
            </button>
          </div>
        </form>
        <div className="flex flex-wrap justify-center gap-2 my-4">
          {['all', 'closest', 'completed', 'incomplete'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-white text-sm font-medium transition-all ${
                filter === type ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          {filteredTasks.map((task) => (
            <div key={task._id} className="bg-gray-200 p-3 rounded-lg shadow-lg flex gap-2 justify-between overflow-x-auto scroll-smooth flex-nowrap items-center">
              <div>
                <p className={`font-medium break-words overflow-y-auto max-h-[50px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ${task.completed ? 'line-through text-green-500' : 'text-gray-700'}`}>
                  {task.subject}
                </p>
                <p className="text-sm text-gray-600">{new Date(task.date).toDateString()}</p>
              </div>
              <div className="flex flex-nowrap gap-2">
                <button
                  onClick={() => toggleCompletion(task._id, task.completed)}
                  className={`px-2 py-1 sm:px-3 sm:py-2 flex-shrink-0 ${task.completed ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-lg hover:bg-green-600`}
                >
                  {task.completed ? 'Unmark' : 'Mark'}
                </button>
                <Link to={`/subtask/${task._id}`} className="px-2 py-1 sm:px-3 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex-shrink-0">
                  Subtask
                </Link>
                <button onClick={() => deleteTask(task._id, 1)} className="px-2 py-1 sm:px-3 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex-shrink-0">
                  Delete
                </button>
              </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
