
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/auth/Login'
import { Dashboard } from './pages/Dashboard'
import { AddEmployee } from './pages/AddEmployee'
import { Registration } from './pages/auth/Registration'
import { UpdateEmployee } from './pages/UpdateEmployee'
import { ToastContainer } from 'react-toastify'
import { ProtectedRoutes } from './component/ProtectedRoutes'
import { AddDepartment } from './pages/AddDepartment'
import { AddPosition } from './pages/AddPosition'


export function App() {
  



  return (
    <>


      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />
        <Route path='/add-employee' element={
          <ProtectedRoutes>
            <AddEmployee />
          </ProtectedRoutes>
        } />
        <Route path='/update-employee/:id' element={
          <ProtectedRoutes>
            <UpdateEmployee />
          </ProtectedRoutes>
        } />
        <Route path='/add-department' element={
          <ProtectedRoutes>
            <AddDepartment />
          </ProtectedRoutes>
        } />
        <Route path='/add-position' element={
          <ProtectedRoutes>
            <AddPosition />
          </ProtectedRoutes>
        } />

      </Routes>
      <ToastContainer />
    </>
  )
}


