import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  console.log(location.state);
  const [isSidepanelOpen, setisSidepanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
    { id: 3, username: "user3" },
  ]);

  const addUserToProject = (user) => {
    console.log(`Adding ${user.username} to the project`);
    // Add user to the project logic here
  };

  return (
    <main className="w-screen h-screen flex">
      <section className="left h-screen w-80 bg-zinc-200 flex flex-col relative">
        <header className="bg-zinc-300 p-4 flex items-center justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:bg-zinc-400 py-1 px-2 rounded-lg font-semibold flex items-center gap-1"
          >
            <i className="ri-add-fill"></i>
            <p>Add Collaborators</p>
          </button>
          <button
            onClick={() => {
              setisSidepanelOpen(!isSidepanelOpen);
            }}
            className="hover:text-zinc-100"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>
        <div className="conversation-area flex-grow overflow-y-auto relative">
          <div className="messagebox flex flex-col flex-grow gap-1">
            <div className="incoming bg-zinc-100 flex flex-col m-1 rounded-lg max-w-56">
              <small className="text-xs opacity-70 p-1">
                example@gmail.com
              </small>
              <p className="text-sm p-1">
                Lorem ipsum dolor Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="incoming ml-auto bg-zinc-100 flex flex-col m-2 rounded-lg max-w-56">
              <small className="text-xs opacity-70 p-1">
                example@gmail.com
              </small>
              <p className="text-sm p-1">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div className="inputarea w-full flex h-14 bg-zinc-300 p-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 text-zinc-800 bg-zinc-300 focus:outline-none"
          />
          <button className="bg-zinc-300 px-3 rounded-lg hover:bg-zinc-400">
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
        <div
          className={`sidepanel w-80 h-screen bg-zinc-200 absolute left-0 top-0 transition-transform transform ${
            isSidepanelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="bg-zinc-300 p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Sidepanel</h1>
            <button
              onClick={() => {
                setisSidepanelOpen(false);
              }}
              className="hover:text-zinc-100 hover:bg-zinc-300 p-1 rounded-full "
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>
          {/* Sidepanel content goes here */}
          <div className="users flex flex-col gap-2 p-4">
            <div className="user flex items-center gap-1 hover:bg-zinc-300 p-1 rounded-lg cursor-pointer">
              <div className="aspect-square rounded-full px-4 py-3 bg-gray-600">
                <i className="ri-user-fill text-zinc-100 text-xl"></i>
              </div>
              <h1 className="text-lg font-semibold">@username</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="right h-screen w-4/5 bg-zinc-100 p-4 overflow-y-auto">
        {/* Add the main content of the project here */}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-200 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-zinc-800 mb-4">
              Add Collaborators
            </h2>
            <ul className="mb-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between p-2 hover:bg-zinc-300 rounded-lg cursor-pointer"
                  onClick={() => addUserToProject(user)}
                >
                  <span className="text-zinc-800">{user.username}</span>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600">
                    Add
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
