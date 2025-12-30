import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import TargetSetup from './pages/TargetSetup'
import Heatmap from './pages/Heatmap'
import SuggestedSets from './pages/SuggestedSets'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/target-setup" element={<TargetSetup />} />
      <Route path="/heatmap" element={<Heatmap />} />
      <Route path="/suggested-sets" element={<SuggestedSets/>}/>
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  )
}

export default App