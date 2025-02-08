
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Smart To-Do List</h1>
      <p className="text-lg mb-6">Organize your tasks efficiently!</p>
      <Link to="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-lg">Get Started</Link>
    </div>
  );
};

export default Home;
