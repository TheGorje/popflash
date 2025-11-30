import styled from 'styled-components'

// @ts-expect-error: SVG module with ?react isn't typed in this project
import PopflashLogo from '../../assets/interface/popflash-logo.svg?react'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors['surface-a0']};
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
  height: 100%;
`
export const TopTextContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
  margin: ${({ theme }) => theme.space.xl};
  position: relative;
`

export const StyledLogo = styled(PopflashLogo)`
  position: absolute;
  width: 76px;
  height: 80px;
  margin-right: 184px;
  top: -34px;
  fill: ${({ theme }) => theme.colors['primary-a0']};
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.lg};
`

export const MapsContainer = styled.div`
  gap: ${({ theme }) => theme.space.md};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const MapWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm};

  opacity: ${({ theme }) => theme.opacity[50]};
  transition: 0.2s ease-out;

  &:hover{
    opacity: 1;
    box-shadow: 0px 0px 8px 1px ${({ theme }) => theme.colors['primary-a0']};
  }

  &:hover .map-icon {
    transform: scale(1.25);
  }

  &:hover .map-banner {
    transform: scale(1.05);
  }
  animation: map-in-animation 0.2s ease-in-out;

  @keyframes map-in-animation {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
`

export const MapImageContainer = styled.div`
  width: 445px;
  height: 250px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
`

export const MapSelected = styled.div<{ $src: string }>`
  background: url(${({ $src }) => $src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.sm};

  transition: 0.2s ease-out;
  &.map-banner {
  }
`
export const MapIconContainer = styled.div`
  position: absolute;
  z-index: 5;
  transition: 0.2s ease-out;
`

export const GrenadesInfosContainer = styled.div`
  gap: ${({ theme }) => theme.space.md};
  display: flex;
  justify-content: center;
`

