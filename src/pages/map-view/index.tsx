import { Header } from '@components/header'

import { MapContent } from './components/map-content'
import { Side } from './components/side'
import { Container } from './styles'

export function MapView() {
  return (
    <Container>
      <Header />
      <Side />
      <MapContent />
    </Container>
  )
}

