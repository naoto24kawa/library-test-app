/** @jsx jsx */
/** @jsxFrag CssBaseline */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hoge from './hoge'

const objectStyle = css({
  color: 'red',
})

// App component
const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <p css={objectStyle}>Hello React!</p>
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/hoge" element={<Hoge />} />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
