import { HashRouter, Route, Routes } from 'react-router-dom'

import { AllMaps } from './pages/all-maps'
import { CreateTrick } from './pages/create-trick/index'
import { Home } from './pages/home/index'
import { MapView } from './pages/map-view/index'
import { Settings } from './pages/settings'
import { useLocalStorageData } from './store/use-local-storage-data'

export default function App() {
  const initialize = useLocalStorageData(s => s.initialize)
  initialize()

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map/:mapId" element={<MapView />} />
        <Route path="/create" element={<CreateTrick />} />
        <Route path="/all-maps/*" element={<AllMaps />} />
        <Route path="/settings/*" element={<Settings />} />

      </Routes>
    </HashRouter>
  )
}
