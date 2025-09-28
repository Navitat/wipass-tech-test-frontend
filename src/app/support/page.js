"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Support() {
  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);

    const newTicket = {
      client,
      email,
      description,
      priority,
    };

    try {
      const res = await fetch("http://localhost:8000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Ticket created: ", data);

      router.push("/");
    } catch (err) {
      console.log("Error submitting form", err);
    }
  };

  return (
    <div className="font-sans justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main>
        <div className="flex flex-col justify-around items-center space-y-4">
          <Link
            href="/"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Go Back
          </Link>
          <h1 className="text-3xl font-semibold">Create New Ticket</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <input
                type="text"
                id="client"
                name="client"
                placeholder="Enter name of the client..."
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <textarea
                type="text"
                id="desc"
                name="desc"
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select a Priority</option>
                <option value="P3">P3</option>
                <option value="P2">P2</option>
                <option value="P1">P1</option>
                <option value="P0">P0</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Create
            </button>
          </form>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-gray-500 p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold">Confirm Submission</h2>
                <p className="mt-2">Client: {client}</p>
                <p>Email: {email}</p>
                <p>Description: {description}</p>
                <p>Priority: {priority}</p>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
