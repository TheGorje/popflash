import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

`
type WrapperBorderType = "import" | "import merge" | "export"

export const WrapperBorder = styled.div<{ $type: WrapperBorderType }>`
  border: 2px solid;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: ${({ theme }) => theme.space.xs};

  border-color:
  ${({ theme, $type }) => {
    if ($type === 'import') {
      return theme.colors["primary-a20"]
    }
    if ($type === 'import merge') {
      return theme.colors["primary-a0"]
    }
    if ($type === 'export') {
      return theme.colors["success-a10"]
    }
  }}
  ;
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
  border-radius: ${({ theme }) => theme.radius.sm};
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
export const DownloadButton = styled.button`
  background-color: ${({ theme }) => theme.colors["success-a0"]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid transparent;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
  transition: 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};

  &:hover{
    border-color: ${({ theme }) => theme.colors["success-a10"]};
  }
`