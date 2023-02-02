import styled from 'styled-components';

export const inputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

export const labelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  input {
    width: 180px;
  }
`

export const label = styled.label`
  margin-right: 5px;
`

export const errorCards = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow: scroll;
  flex-flow: column-reverse;

  &::-webkit-scrollbar {
    display: none;
  }
`