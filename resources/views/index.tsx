import React from 'react'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { RecoilRoot } from 'recoil'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/library.css'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./**/*.tsx', {
      eager: true,
    })
    return pages[`./pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <RecoilRoot>
          <CssBaseline>
            <App {...props} />
          </CssBaseline>
        </RecoilRoot>
      </React.StrictMode>
    )
  },
})
