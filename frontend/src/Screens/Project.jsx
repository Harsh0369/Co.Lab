import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Project = () => {
    const location = useLocation()
    console.log(location.state)
    const [isSidepanelOpen, setisSidepanelOpen] = useState(false)
    return (
      <main className="w-screen h-screen flex">
        <section className="left h-screen w-80 bg-zinc-200  flex flex-col">
          <header className="bg-zinc-300 p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Project</h1>
            <button
              onClick={() => {
                setisSidepanelOpen(!isSidepanelOpen);
              }}
              className=" hover:text-zinc-100"
            >
              <i className="ri-group-fill"></i>
            </button>
          </header>
          <div className="conversation-area flex-grow overflow-y-auto relative ">
            <div className="messagebox flex flex-col flex-grow gap-1">
              <div className="incoming bg-zinc-100 display flex flex-col m-1 rounded-lg max-w-56">
                <small className="text-xs opacity-70 p-1">
                  example@gmail.com
                </small>
                <p className="text-sm p-1">
                  Lorem ipsum dolor Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="incoming ml-auto bg-zinc-100 display flex flex-col m-2 rounded-lg max-w-56">
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
            <button className="bg-zinc-300  px-3 rounded-lg hover:bg-zinc-400">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
          <div
            className={`sidepanel w-72 p-8 h-screen bg-zinc-400 absolute left-0 top-36 transition-all z-10 ${
              isSidepanelOpen ? "block" : "hidden"
            }`}
          ></div>
        </section>
        <section className="right h-screen w-4/5 bg-zinc-100 p-4 overflow-y-auto">
          {/* Add the main content of the project here */}
        </section>
      </main>
    );
}

export default Project