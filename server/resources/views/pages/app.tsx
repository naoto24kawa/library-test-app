/** @jsx jsx */
/** @jsxFrag CssBaseline */
import { css } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'

const objectStyle = css({
  color: 'red',
})

// App component
const App: React.FunctionComponent = ({ user, books }) => {
  console.log(books)
  console.log(user)
  return (
    <>
      <CssBaseline />
      <p css={objectStyle}>Hello React!</p>
      <div>{books.data[0].title}</div>
    </>
  )
}

export default App
