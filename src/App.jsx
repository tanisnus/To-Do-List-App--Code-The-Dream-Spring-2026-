import './App.css'

import TodosPage from './features/Todos/TodosPage'; 
import Header from './hooks/Header';
import Logon from './features/Logon';
import { useAuth } from './contexts/AuthContext';
import Logoff from './features/Logoff';


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      {isAuthenticated ? <TodosPage /> : <Logon />}
      {isAuthenticated && <Logoff />}
    </div>
  )
}

export default App
