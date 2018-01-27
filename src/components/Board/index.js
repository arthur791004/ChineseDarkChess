import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import { STATUS, COLORS, MOVE_TYPES } from '@/constants';
import Button from '@/components/Button';
import Users from '@/components/Users';
import Piece from '@/components/Piece';
import { PIECE_SIZE } from '@/components/Piece/constants';
import { BOARD_SIZES } from './constants';
import { initUsers, initPieces, getMoveType, isBeatable } from './utils';

const PieceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BoardWrapper = styled.div`
  width: ${BOARD_SIZES.COLS * PIECE_SIZE}px;
`;

class Board extends PureComponent {
  state = {
    pieces: initPieces(),
    users: initUsers(),
    selected: -1,
    currentUser: 0,
  };

  restart = () => {
    this.setState({
      pieces: initPieces(),
      users: initUsers(),
      selected: -1,
      currentUser: 0,
    })
  }

  setUserColors = (currentUser, currentColor) => {
    const { users } = this.state;

    if (users[currentUser].color) {
      return;
    }

    const nextUsers = users.map((user, index) => ({
      ...user,
      color: Object.keys(COLORS).find(color => (currentUser === index
        ? color === currentColor
        : color !== currentColor
      )),
    }))

    this.setState({ users: nextUsers });
  }

  handleClick = index => () => {
    const { users, pieces, selected, currentUser } = this.state;
    const { status, color } = pieces[index];

    // select item
    if (selected < 0) {
      if (status === STATUS.DEAD) {
        return;
      } else if (status === STATUS.CLOSED) {
        // open piece
        const nextPieces = [
          ...pieces.slice(0, index),
          {
            ...pieces[index],
            status: STATUS.OPEN,
          },
          ...pieces.slice(index + 1),
        ];

        this.setUserColors(currentUser, color);

        return this.setState({
          pieces: nextPieces,
          currentUser: Number(!currentUser),
        });
      }

      if (users[currentUser].color !== color) {
        return;
      }

      return this.setState({ selected: index });
    } else if (selected === index) {
      return this.setState({ selected: -1 });
    }

    const moveType = getMoveType(selected, index, pieces);
    if (moveType === MOVE_TYPES.NONE) {
      return;
    }

    // do move
    if (isBeatable(pieces[selected], pieces[index], moveType)) {
      const nextPieces = pieces.slice();
      const tmp = nextPieces[selected];

      nextPieces[selected] = nextPieces[index];
      nextPieces[selected].status = STATUS.DEAD;
      nextPieces[index] = tmp;

      return this.setState({
        selected: -1,
        pieces: nextPieces,
        currentUser: Number(!currentUser),
      });
    }
  }

  render() {
    const { users, currentUser, pieces, selected } = this.state;

    return (
      <Fragment>
        <Button onClick={this.restart}>重新開始</Button>
        <BoardWrapper>
          <Users users={users} currentUser={currentUser} />
          <PieceWrapper>
            {pieces.map((piece, index) => (
              <Piece
                key={piece.id}
                piece={piece}
                isSelected={index === selected}
                handleClick={this.handleClick(index)}
              />
            ))}
          </PieceWrapper>
        </BoardWrapper>
      </Fragment>
    );
  }
}

export default Board;