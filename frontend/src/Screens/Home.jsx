import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axiosInstance from "../config/axios";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Projects
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Todo and Notes
  const [showTodo, setShowTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [notes, setNotes] = useState("");

  // Functions
  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const fetchProjects = () => {
    axiosInstance.get("/projects/all")
      .then(res => {
        setProjects(res.data.projects);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  const createProject = (e) => {
    e.preventDefault();
    axiosInstance.post("/projects/create", { name: projectName })
      .then(res => {
        setIsModalOpen(false);
        setProjects([...projects, res.data.project]);
        setProjectName("");
      })
      .catch(err => console.error(err));
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTask = {
        id: todos.length + 1,
        task: newTodo,
        done: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  // Toggle todo done
  const toggleTodoDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // const toggleTodoDone = (id) => {
  //   setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  // };

  // const handleAddTodo = () => {
  //   if (newTodo.trim() !== "") {
  //     setTodos([...todos, { id: todos.length + 1, task: newTodo, done: false }]);
  //     setNewTodo("");
  //   }
  // };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div
      className="flex h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('/Blue-Wallpapers.jpeg')`,
      }}
    >
      {/* Sidebar */}
      <div className={`bg-black bg-opacity-70 text-white transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"} flex flex-col min-h-screen`}>
        <button className="p-4 focus:outline-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>

        {sidebarOpen && (
          <div className="p-4 space-y-4">
            <div>
              <button onClick={() => toggleDropdown("profile")} className="w-full text-left py-2 px-2 hover:bg-gray-700 rounded-lg">
                Profile
              </button>
              {openDropdown === "profile" && (
                <div className="ml-4 mt-2 text-left space-y-1 text-sm text-gray-300">
                  <p>Name: {user?.email?.split("@")[0] || "User"}</p>
                  <p>Email: {user?.email || "example@example.com"}</p>
                </div>
              )}
            </div>

            <div>
              <button onClick={() => toggleDropdown("manage")} className="w-full text-left py-2 px-2 hover:bg-gray-700 rounded-lg">
                Manage
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 rounded-xl ease-in-out px-6 py-4 overflow-y-auto bg-black bg-opacity-40 backdrop-blur-0 ${
          sidebarOpen ? "scale-80" : "scale-95"
        }`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-left font-poppins text-white mb-3">
            Welcome,  {user?.email ? user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1) : "User"}
          </h1>
          <p className="text-lg italic font-poppins text-gray-200">
            "Teamwork divides the task and multiplies the success."
          </p>
        </div>
        <div className="flex justify-between pl-2 space-x-4">
          {/* Project Section */}
          <div className="bg-white bg-opacity-40 pt-4 pb-5 px-5 rounded-2xl max-h-fit w-1/3 shadow-lg hover:scale-105 hover:shadow-2xl transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-gray-900 text-xl font-poppins">Your Projects</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 px-3 py-2 rounded-full text-base text-white hover:bg-blue-700 transform transition-transform duration-300"
              >
                + New Project
              </button>
            </div>

            {loading ? (
             <p className="text-gray-200">Loading projects...</p>
             ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white font-poppins bg-opacity-60 p-4 rounded-lg shadow hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                  onClick={() => navigate(`/project`, { state: { project } })}
                >
                  <h3 className="text-base font-semibold text-left">{project.name}</h3>
                  <p className="text-base text-gray-600 text-left">Members: {project.users.length}</p>
                </div>
              ))}
            </div>
        )}
          </div>

          {/* Notepad/To-Do Section */}
          <div className="bg-white bg-opacity-40 p-6 pt-3 px-5 max-h-fit rounded-2xl w-1/3 shadow-lg hover:scale-105 hover:shadow-2xl transform transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">  
              <h2 className="text-gray-900 text-xl font-poppins">
                {showTodo ? "To-Do List" : "Notepad"}
              </h2>
              {/* Toggle Switch */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={showTodo}
                    onChange={() => setShowTodo(!showTodo)}
                  />
                  <div className="block bg-blue-900 w-10 h-6 rounded-full"></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      showTodo ? "translate-x-4" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Switch Content */}
            {showTodo ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New task"
                    className="flex-1 p-2 rounded bg-gray-200 text-gray-800 placeholder-gray-500"
                  />
                  <button
                    onClick={handleAddTodo}
                    className="bg-yellow-400 px-3 py-2 rounded-md hover:bg-yellow-600 text-grey-400"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-deci list-inside text-gray-900 text-lg space-y-1">
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className={`cursor-pointer text-left pl-3 ${
                        todo.done ? "line-through text-black-500" : ""
                      }`}
                      onClick={() => toggleTodoDone(todo.id)}
                    >
                      {todo.task}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <textarea
                placeholder="Write your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-40 p-3 rounded bg-yellow-100 opacity-65 text-gray-800 placeholder-gray-700 resize-none"
              ></textarea>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal for Creating Projects */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-blue-200 opacity-90 p-6 rounded-lg shadow-md w-1/3 transition">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <label className="block text-sm font-medium mb-2">Project Name</label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <div className="flex justify-end mt-4">
                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};




// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/user.context";
// import axiosInstance from "../config/axios";
// import { RiAddLine, RiUserFill } from "react-icons/ri"; // Icons

// const Home = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projectName, setProjectName] = useState("");
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   function createProject(e) {
//     e.preventDefault();
//     axiosInstance
//       .post("/projects/create", { name: projectName })
//       .then((res) => {
//         setIsModalOpen(false);
//         setProjects([...projects, res.data.project]); // Add to UI
//       })
//       .catch((err) => console.log(err));
//   }

//   useEffect(() => {
//     axiosInstance
//       .get("/projects/all")
//       .then((res) => {
//         setProjects(res.data.projects);
//         setLoading(false);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <main className="h-screen flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md text-white font-medium transition"
//         >
//           <RiAddLine className="mr-2" /> New Project
//         </button>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 bg-cover bg-center bg-no-repeat bg-[url('/public/background.png')] h-screen flex flex-col">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-800 text-transparent bg-clip-text">
//             Welcome,{" "}
//             {user?.email
//               ? user.email.split("@")[0].charAt(0).toUpperCase() +
//                 user.email.split("@")[0].slice(1)
//               : "User"}
//           </h1>
//         </div>

//         {/* Project List */}
//         {loading ? (
//           <p className="text-gray-500">Loading projects...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {projects.map((project) => (
//               <div
//                 key={project._id}
//                 onClick={() => navigate(`/project`, { state: { project } })}
//                 className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
//               >
//                 <h3 className="font-semibold text-lg">{project.name}</h3>
//                 <div className="flex items-center gap-2 text-gray-600 mt-2">
//                   <RiUserFill />
//                   <span>Members: {project.users.length}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal for Creating Projects */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-1/3 transition">
//             <h2 className="text-xl font-bold mb-4">Create New Project</h2>
//             <form onSubmit={createProject}>
//               <label className="block text-sm font-medium mb-2">
//                 Project Name
//               </label>
//               <input
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 type="text"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 required
//               />
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="button"
//                   className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                 >
//                   Create
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default Home;
