import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const bounce = keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-3px);
  }
`

const activeCss = css`
  animation: ${bounce} 0.5s infinite alternate;
  opacity: 1;
`

const User = styled.div`
  padding: 5px 12px;
  border-radius: 4px;
  color: white;
  background-color: ${props => props.color || 'gray'};
  opacity: 0.6;

  ${props => props.isActive && activeCss};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 20px 0;
  font-size: 18px;
`

const Users = ({ users, currentUser }) => (
  <Wrapper>
    {users.map(({ name, color }, index) => (
      <User key={name} color={color} isActive={index === currentUser}>
        {name}
      </User>
    ))}
  </Wrapper>
);

export default Users;