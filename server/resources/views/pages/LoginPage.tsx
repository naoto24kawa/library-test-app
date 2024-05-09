import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import 'resources/css/login.css'
import PrimaryButtonComponent from '../components/PrimaryButtonComponent'

const LoginPage: React.FunctionComponent = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const key = e.target.id
    const value = e.target.value
    setData((values) => ({
      ...values,
      [key]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    post('/login')
  }

  console.log(errors)

  return (
    <div className="h-100 d-flex align-items-center py-4 bg-body-tertiary">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              onChange={handleChange}
              value={data.email}
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email address</label>
            {/* <x-input-error :messages="$errors->get('email')" className="mt-2" /> */}
          </div>
          <div className="form-floating">
            <input
              onChange={handleChange}
              value={data.password}
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
            {/* <x-input-error :messages="$errors->get('password')" className="mt-2" /> */}
          </div>

          {/* <!-- Remember Me --> */}
          {/* <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember_me"
              name="remember"
            />
            <label className="form-check-label" htmlFor="remember_me">
              Remember me
            </label>
          </div> */}

          <Link
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            href="/react/register"
          >
            Not Registered yet?
          </Link>
          {/* <Link
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            href="{{ route('password.request') }}"
          >
            {'Forgot your password?'}
          </Link> */}

          <PrimaryButtonComponent
            type="submit"
            className={['w-100', 'ml-3']}
            disabled={processing}
          >
            ログイン
          </PrimaryButtonComponent>
        </form>
      </main>
    </div>
  )
}

export default LoginPage
