import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PlannerPage from './pages/PlannerPage'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlannerPage />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
