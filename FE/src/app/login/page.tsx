'use client'

import { FormEvent } from 'react'
import { login } from './_lib/api'

export default function Page() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const studentId = Number(e.currentTarget.studentId.value)
    const password = e.currentTarget.password.value
    await login(studentId, password)
  }

  return (
    <main className="flex flex-col gap-8 text-center w-6c mx-auto">
      <h1 className="font-bold text-emerald-500">Welcome back to Eco Merge :)</h1>
      <form action="#" className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex items-end gap-4">
          <label htmlFor="studentId">Student ID</label>
          <input
            className="flex-1 border-solid border-b-2 border-black focus:outline-none focus:border-emerald-400 remove-arrow"
            type="number"
            id="studentId"
            required
          />
        </div>
        <div className="flex items-end gap-4">
          <label htmlFor="password">Password</label>
          <input
            className="flex-1 border-solid border-b-2 border-black focus:outline-none focus:border-emerald-400"
            type="password"
            id="password"
            required
          />
        </div>
        <button
          className="rounded px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-400"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  )
}
