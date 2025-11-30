import styled from "styled-components"

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  max-width: 100%;
  line-break: anywhere;
`

export const Button = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${({ theme, $active }) =>
    $active ? theme.colors["primary-a0"] : theme.colors["surface-a20"]};
  border-radius: ${({ theme }) => theme.space["2xs"]};
  opacity: ${({ theme, $active }) => ($active ? "100" : theme.opacity[80])};
  padding: ${({ theme }) => theme.space["2xs"]} ${({ theme }) => theme.space.sm};
  gap: ${({ theme }) => theme.space.sm};
  transition: 0.2s ease-out;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors["surface-a10"] : 'transparent'};
  &:hover {
    background-color: ${({ theme }) => theme.colors["surface-a10"]};
    opacity: 100;
  }
`

export const GrenadeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid ${({ theme }) => theme.colors["surface-tonal-a30"]};
  padding-bottom:  ${({ theme }) => theme.space.sm};

  &:last-child {
    border-bottom: none;
    padding-bottom:  0px;
  }
`

export const Divider = styled.div`
  height: 1rem;
  width: 0.05rem;
  background-color:  ${({ theme }) => theme.colors["surface-a30"]};
`

export const GrenadeIcon = styled.div`
  border: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors["primary-a20"]};
  height: 12px;
  width: 12px;
`

export const GrenadeOverlay = styled.div`
 position: fixed;
  z-index: 102;

  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.space.xs};
  opacity: 1;
  background-color: ${({ theme }) => theme.colors["surface-a10"]};
  padding: ${({ theme }) => theme.space.xs};
  border-radius:${({ theme }) => theme.radius.sm};
  box-shadow: 0px 0px 5px black;

  transition: 0.15s ease-out;
  @keyframes fade-in-playlist-button {
    from {
      opacity: 0;
      margin-top: -20px;
    }
    to {
      opacity: 1;
      margin-top: 0px;

    }
  }
  
  animation: fade-in-playlist-button 0.2s ease-in forwards;
`