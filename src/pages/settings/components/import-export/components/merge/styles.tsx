import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

`
export const FeedbackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.25);
  z-index: 999;
`


export const WrapperBorder = styled.div`
  border: 2px solid;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: ${({ theme }) => theme.space.sm};

  border-color:
  ${({ theme }) => theme.colors["primary-a0"]}
  ;
`

export const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors["surface-a20"]};
`
export const InputFile = styled.label<{ $isFilled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border: 2px solid ${({ theme, $isFilled }) => $isFilled ?
    theme.colors["info-a0"]
    :
    theme.colors["surface-a30"]
  };
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: ${({ $isFilled }) => $isFilled ? 'default' : 'pointer'};
  transition: 0.2s ease;

  &:hover{
  background: ${({ theme, $isFilled }) => !$isFilled && theme.colors["surface-a10"]};
}
`
export const ButtonImport = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.space["2xs"]};
  border: 2px solid ${({ theme }) => theme.colors["success-a10"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
  transition: 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};

  &:hover{
    background-color: ${({ theme }) => theme.colors["surface-a10"]};
  }
`
export const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  align-items: end;
`
