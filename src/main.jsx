import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "./style/global.css"
import Configuration from './configuration'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DocsComponent from './components/student/docs'
import RequestCompoent from './components/student/request'
import MoocComponent from './components/student/mooc'
import UserManagment from './components/admin/users'
import MoocResult from './components/admin/mooc_validation'
import DocsIssue from './components/admin/doc_request'

const app_routes = createBrowserRouter([
  {
    path: '/',
    element: <Configuration />,

    children: [
      { path: 'student/docs', element: <DocsComponent /> },
      { path: 'student/request', element: <RequestCompoent /> },
      { path: 'student/mooc', element: <MoocComponent /> },

      { path: 'admin/users', element: <UserManagment /> },
      { path: 'admin/mooc', element: <MoocResult /> },
      { path: 'admin/docs', element: <DocsIssue /> },
    ]

  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={app_routes} />
  </React.StrictMode>,
)
