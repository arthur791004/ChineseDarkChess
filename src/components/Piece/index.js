import React from 'react';
import styled, { css } from 'styled-components';
import { STATUS } from '@/constants';
import { PIECE_SIZE } from './constants';

const selectedBorderCss = css`
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 105%;
  height: 105%;
  background:
    linear-gradient(to left, #82543B, #82543B) left top no-repeat,
    linear-gradient(to bottom, #82543B, #82543B) left top no-repeat,
    linear-gradient(to left, #82543B, #82543B) right top no-repeat,
    linear-gradient(to bottom, #82543B, #82543B) right top no-repeat,
    linear-gradient(to left, #82543B, #82543B) left bottom no-repeat,
    linear-gradient(to bottom, #82543B, #82543B) left bottom no-repeat,
    linear-gradient(to left, #82543B, #82543B) right bottom no-repeat,
    linear-gradient(to left, #82543B, #82543B) right bottom no-repeat;
  background-size: 3px 10px,10px 3px,3px 10px,10px 3px;
  opacity: 0;
  transition: opacity 0.15s ease-out;
`;

const selectedCss = css`
  opacity: 1;
`;

const deadCss = css`
  border-color: transparent;
`;

const closedCss = css`
  background-color: green;
  border-color: #82543B;
`;

const PieceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 90%;
  height: 90%;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  border: 2px solid ${props => props.color};
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 36px;
  cursor: pointer;
  user-select: none;

  &:hover:after {
    opacity: 0.6;
    ${props => props.isSelected && selectedCss}
  }

  &:after {
    ${selectedBorderCss};
    ${props => props.isSelected && selectedCss}
  }

  ${props => props.status === STATUS.DEAD && deadCss};
  ${props => props.status === STATUS.CLOSED && closedCss};
`

const PieceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${PIECE_SIZE}px;
  height: ${PIECE_SIZE}px;
  background-color: ${props => props.backgroundColor};
  border-top: 2px solid ${props => props.borderColor};
  border-left: 2px solid ${props => props.borderColor};
  box-sizing: border-box;

  &:nth-child(8n) {
    border-right: 2px solid ${props => props.borderColor};
  }

  &:nth-last-child(-n + 8) {
    border-bottom: 2px solid ${props => props.borderColor};
  }
`;

const renderItem = ({ piece, isSelected, handleClick }) => {
  const { name, color, status } = piece;

  return (
    <PieceItem
      color={status === STATUS.OPEN ? color : ''}
      status={status}
      isSelected={isSelected}
      onClick={handleClick}
    >
      {status === STATUS.OPEN && name}
    </PieceItem>
  );
}

const Piece = (props) => (
  <PieceWrapper
    borderColor="#82543B"
    backgroundColor="#F3C89C"
  >
    {renderItem(props)}
  </PieceWrapper>
);

export default Piece;