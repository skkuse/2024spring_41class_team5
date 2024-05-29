export default function Page() {
  return (
    <main className="flex flex-col gap-8 text-center w-6c mx-auto">
      <h1 className="font-bold">Welcome to Eco Merge!</h1>
      <form action="#" className="flex flex-col gap-4">
        <div className="flex items-end gap-4">
          <label htmlFor="name">Name</label>
          <input
            className="flex-1 border-solid border-b-2 border-black"
            type="text"
            id="name"
          />
        </div>
        <div className="flex items-end gap-4">
          <label htmlFor="studentId">Student ID</label>
          <input
            className="flex-1 border-solid border-b-2 border-black"
            type="number"
            id="studentId"
          />
        </div>
        <div className="flex items-end gap-4">
          <label htmlFor="password">Password</label>
          <input
            className="flex-1 border-solid border-b-2 border-black"
            type="password"
            id="password"
          />
        </div>

        <button
          className="rounded px-4 py-2 bg-green-900 text-white hover:bg-green-800"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
}
