import styled from "styled-components"

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  min-width: 500px;
  height: 100%;
  background: ${({ theme }) => theme.colors["surface-a0"]};
  box-shadow: 4px 0 10px rgba(0,0,0,0.15);

  overflow: auto;
  z-index: 101; /* fica acima do mapa */
  animation: slide-in 0.2s ease-in;
  @keyframes slide-in {
    0% { transform: translateX(-600px); }
    100% { transform: translateX(0); }
  }
`
export const GrenadeContainer = styled.div`
  gap: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.space.md};
`

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors["primary-a40"]} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors["primary-a40"]};
    border-radius: ${({ theme }) => theme.radius.md};
  }
  z-index: 103;
`

export const DeleteButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.colors["danger-a0"]};
  padding: ${({ theme }) => theme.space.xs};
  width: 160px;
  opacity: ${({ theme }) => theme.opacity[80]};

  transition: 0.2s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors["danger-a10"]};
    opacity: 1;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};


`