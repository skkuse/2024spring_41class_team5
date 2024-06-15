'use client'

import { FormEvent } from 'react'
import { signup } from './_lib/api'

export default function Page() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const studentId = Number(e.currentTarget.studentId.value)
    const password = e.currentTarget.password.value
    const passwordConfirm = e.currentTarget['password-confirm'].value

    if (password !== passwordConfirm) {
      alert('Password and Password Confirm are not same')
      return
    }

    await signup(username, studentId, password)
  }

  return (
    <main className="flex flex-col gap-8 text-center w-6c mx-auto">
      <h1 className="font-bold">Welcome to Eco Merge!</h1>
      <form action="#" className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex items-end gap-4">
          <label htmlFor="username">Name</label>
          <input
            className="flex-1 border-solid border-b-2 border-black"
            type="text"
            id="username"
            required
          />
        </div>
        <div className="flex items-end gap-4">
          <label htmlFor="studentId">Student ID</label>
          <input
            className="flex-1 border-solid border-b-2 border-black remove-arrow"
            type="number"
            id="studentId"
            required
          />
        </div>
        <div className="flex items-end gap-4">
          <label htmlFor="password">Password</label>
          <input
            className="flex-1 border-solid border-b-2 border-black"
            type="password"
            id="password"
            required
          />
        </div>
        <div className="flex items-end gap-4">
          <label htmlFor="password-confirm">Password Confirm</label>
          <input
            className="flex-1 border-solid border-b-2 border-black"
            type="password"
            id="password-confirm"
            required
          />
        </div>
        <button
          className="rounded px-4 py-2 bg-green-900 text-white hover:bg-green-800"
          type="submit"
        >
          Signup
        </button>
      </form>
    </main>
  )
}
