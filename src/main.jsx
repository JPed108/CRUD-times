import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Team from './Team.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [{
    path: '/:team',
    element: <Team />,
    }
  ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
