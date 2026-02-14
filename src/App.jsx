import { Routes, Route } from 'react-router-dom'
import Timeline from './views/Timeline'
import Valentine from './views/Valentine'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Timeline />} />
      <Route path="/valentine" element={<Valentine />} />
    </Routes>
  )
}
