// import './App.css'

// import { Routes, Route } from 'react-router'
// import TodosPage from './pages/TodosPage'
// import Header from './shared/Header'
// import Logon from './features/Logon'
// import Logoff from './features/Logoff'
// import { useAuth } from './contexts/AuthContext'


// function App() {
//   const { isAuthenticated } = useAuth()

//   return (
//     <div>
//       <Header />
//       {isAuthenticated && <Logoff />}
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <TodosPage /> : <Logon />} />
//         <Route path="/login" element={<Logon />} />
//         <Route path="/todos" element={isAuthenticated ? <TodosPage /> : <Logon />} />
//       </Routes>
//     </div>
//   )
// }

// export default App


import './App.css';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import RequireAuth from './components/RequireAuth';
import Header from './shared/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/todos'
          element={
            <RequireAuth>
              <TodosPage />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
