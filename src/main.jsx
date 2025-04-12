import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router'
import  Home  from './pages/Home.jsx'
import DashboardLayoutBasic  from './pages/Dashboard.jsx'
import AuthSignIn from './pages/AuthSignIn'
import Account from './pages/Account'
import Context from './context/Context.jsx'
import User from './pages/User'
import LoanFormModal from './pages/Loan';
import HorizontalLinearStepper from './components/Stepper';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Context>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<AuthSignIn />} />
        <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        <Route path="/authsignin" element={<AuthSignIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/user" element={<User />} />
        <Route path="/loan" element={<LoanFormModal />} />
        <Route path="/dashboard/loans" element={<HorizontalLinearStepper />} />
        {/* Add more routes here */}
      </Routes>

    </Context>

    </BrowserRouter>
  </StrictMode>,
)
