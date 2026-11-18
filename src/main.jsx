import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './components/Root/Root.jsx'
import Error from './components/Error/Error.jsx'
import Home from './pages/Home.jsx'
import FriendDetails from './components/Friends/FriendDetails.jsx'
import Timeline from './components/Timeline/Timeline.jsx'
import Stats from './components/Stats/Stats.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
    children: [
      {
        index: true, element: <Home /> 
      },
      {
        path: "/friends/:id", element: <FriendDetails />
      },
      {
        path: "/timeline", element: <Timeline />
      },
      {
        path:"/stats", element: <Stats />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
