import Link from "next/link";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:8000/tickets");

    if (!res.ok) {
      throw new Error(`HTTP Error status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.log("Error fetching tickets", err);

    return null;
  }
};

export default async function Home() {
  const tickets = await getTickets();

  return (
    <div className="font-sans justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main>
        <div className="flex justify-around items-center space-x-4">
          <h1 className="text-3xl font-semibold">Current Tickets</h1>
          <Link
            href="/support"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Submit new ticket
          </Link>
        </div>
        <div className="mt-6">
          {tickets === null ? (
            <p className="text-center text-red-500 font-semibold">
              Server error: unable to fetch tickets.
            </p>
          ) : (
            <table className="table-auto min-w-screen text-center">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>E-mail</th>
                  <th>Description</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, i) => {
                  return (
                    <tr key={i}>
                      <td>{ticket.client}</td>
                      <td>{ticket.email}</td>
                      <td>{ticket.description}</td>
                      <td>{ticket.priority}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
