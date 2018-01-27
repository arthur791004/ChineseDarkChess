import styled from 'styled-components';

const Button = styled.div`
  width: fit-content;
  padding: 8px;
  border-radius: 4px;
  color: #ECF6FD;
  background-color: #108EE9;
  transition: opacity 0.15s ease-in;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;