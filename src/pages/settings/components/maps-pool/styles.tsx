import { TextBodyLg } from "@src/styles/typography"
import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
`

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  flex-wrap: wrap;
  flex-direction: row;
`

export const MapButton = styled.button`
  width: 250px;
  height: 150px;
  position: relative;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};

  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;

  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};

  opacity: ${({ theme }) => theme.opacity[50]};
  transition: 0.2s ease-out;



  &:hover {
    opacity: 1;
  }
  &:hover .map-banner {
    transform: scale(1.2);
  }

   &:hover .map-icon {
    transform: scale(1.1);
  }
   &:hover .map-text {
    transform: scale(1.05);
  }

  animation: map-in-settings-animation 0.2s cubic-bezier(0.23, 1, 0.320, 1) ;

  @keyframes map-in-settings-animation {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }

`

export const MapWrapper = styled.div`
  width: 250px;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  z-index: -1;
  position: absolute;

`
export const MapBanner = styled.div<{ $imageSrc: string }>`
  background: url(${({ $imageSrc }) => $imageSrc});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  transition: 0.2s ease-out;
`

export const MapNameText = styled(TextBodyLg)`
  text-transform: capitalize;

  padding: 0 ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  border: 1px solid rgba(255, 255, 255, 0.15);
`

export const Action = styled.div`
  display: flex;
  align-items: center;
  justify-items: start;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space.lg};
`

export const RestoreButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.colors["warning-a0"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};

  opacity: ${({ theme }) => theme.opacity[50]};
  transition: 0.2s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors["warning-a10"]};
    opacity: 1;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
`
