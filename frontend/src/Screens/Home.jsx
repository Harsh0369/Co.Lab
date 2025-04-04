import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axiosInstance from "../config/axios";
import { RiAddLine, RiUserFill } from "react-icons/ri"; // Icons

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  function createProject(e) {
    e.preventDefault();
    axiosInstance
      .post("/projects/create", { name: projectName })
      .then((res) => {
        setIsModalOpen(false);
        setProjects([...projects, res.data.project]); // Add to UI
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axiosInstance
      .get("/projects/all")
      .then((res) => {
        setProjects(res.data.projects);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md text-white font-medium transition"
        >
          <RiAddLine className="mr-2" /> New Project
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 bg-cover bg-center bg-no-repeat bg-[url('/public/background.png')] h-screen flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-800 text-transparent bg-clip-text">
            Welcome,{" "}
            {user?.email
              ? user.email.split("@")[0].charAt(0).toUpperCase() +
                user.email.split("@")[0].slice(1)
              : "User"}
          </h1>
        </div>

        {/* Project List */}
        {loading ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/project`, { state: { project } })}
                className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <RiUserFill />
                  <span>Members: {project.users.length}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Creating Projects */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3 transition">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <label className="block text-sm font-medium mb-2">
                Project Name
              </label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
