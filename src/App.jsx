import './App.css'

import TodosPage from './features/Todos/TodosPage'; 
import Header from './hooks/Header';


function App() {

  return (
    <div>
      <Header />
      <TodosPage />
    
    </div>
  )
}

export default App
