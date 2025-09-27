import Link from "next/link";

const getTickets = async () => {
  const res = await fetch("http://localhost:8000/tickets");
  return res.json();
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
        <div className="mt-6 grid gap-4">
          {tickets.map((ticket, i) => {
            return (
              <div key={i} className="p-4 bg-gray-900 rounded-md shadow-sm">
                {ticket.client}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
