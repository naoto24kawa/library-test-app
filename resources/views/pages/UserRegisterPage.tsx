/** @jsx css, jsx */
/** @jsxFrag css, jsx */
import { css, SerializedStyles } from '@emotion/react' // eslint-disable-line
import { Link, router, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import 'resources/css/register.css'
import PrimaryButtonComponent from '../components/PrimaryButtonComponent'
import Layout from '../layouts/Layout'

const styles = {
  formFloatingTop: css({
    color: 'red',
    marginBottom: '-1px',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
  }),
  formFloating: css({
    color: 'red',
    marginBottom: '-1px',
    borderRadius: '0',
  }),
  formFloatingBottom: css({
    color: 'red',
    borderTopRightRadius: '0',
    borderTopLeftRadius: '0',
  }),
}

const UserRegisterPage: React.FunctionComponent = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
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
    post('/register')
  }

  return (
    <Layout>
      <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

            {/* <!-- Name --> */}
            <div className="form-floating">
              <input
                onChange={handleChange}
                id="name"
                className="form-control"
                type="text"
                css={styles.formFloatingTop}
                required
                placeholder="Name"
              />
              <label htmlFor="name">Name</label>
              {/* <x-input-error :messages="$errors->get('name')" /> */}
            </div>

            {/* <!-- Email Address --> */}
            <div className="form-floating">
              <input
                onChange={handleChange}
                id="email"
                className="form-control"
                type="email"
                name="email"
                css={styles.formFloating}
                required
                placeholder="Email Address"
              />
              <label htmlFor="email">Email Address</label>
              {/* <x-input-error :messages="$errors->get('email')" /> */}
            </div>

            {/* <!-- Password --> */}
            <div className="form-floating">
              <input
                onChange={handleChange}
                id="password"
                className="form-control"
                type="password"
                name="password"
                css={styles.formFloating}
                required
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
              {/* <x-input-error :messages="$errors->get('password')" /> */}
            </div>

            {/* <!-- Confirm Password --> */}
            <div
              className="form-floating"
              css={css`
                margin-bottom: 24px;
              `}
            >
              <input
                id="password_confirmation"
                className="form-control"
                type="password"
                name="password_confirmation"
                css={styles.formFloatingBottom}
                required
                placeholder="Confirm Password"
              />
              <label htmlFor="password_confirmation">Confirm Password</label>
              {/* <x-input-error :messages="$errors->get('password_confirmation')" /> */}
            </div>

            <div className="flex items-center justify-end">
              <Link
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                href="{{ route('login') }}"
              >
                {'Already registered?'}
              </Link>

              <PrimaryButtonComponent type="submit" className="w-100 ml-4">
                登録する
              </PrimaryButtonComponent>
            </div>
          </form>
        </main>
      </div>
    </Layout>
  )
}

export default UserRegisterPage
