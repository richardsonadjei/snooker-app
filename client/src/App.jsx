import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import SignOut from './Pages/SignOut';
import Profile from './Pages/Profile';
import TotalDailySalesReport from './Pages/reports/TotalDailySales';
import SalesReportWithinAPeriod from './Pages/reports/SalesReportWithinAPeriod';
import RecordMaintenance from './Pages/MaintenanceExpense';
import RecordOtherExpense from './Pages/OtherExpense';
import AllExpenseReport from './Pages/reports/AllExpenseReport';
import SignIn from './pages/SignIn';



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-out' element={<SignOut />} />
        <Route element={<PrivateRoute />}>
        
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/total-daily-sales' element={<TotalDailySalesReport/>} />
          <Route path='/sales-report-within-a-period' element={<SalesReportWithinAPeriod/>} />
          <Route path='/add-maintenance-expense' element={<RecordMaintenance/>} />
          <Route path='/add-other-expense' element={<RecordOtherExpense/>} />
          <Route path='/all-expense-report' element={<AllExpenseReport/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}