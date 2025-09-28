import Link from "next/link";

export default function Support() {
  return (
    <div className="font-sans justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main>
        <div className="flex flex-col justify-around items-center space-x-4">
          <Link
            href="/"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Go Back
          </Link>
          <h1 className="text-3xl font-semibold">Create New Ticket</h1>
        </div>
      </main>
    </div>
  );
}
