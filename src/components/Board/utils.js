import shortid from 'shortid';
import { PIECES, COLORS, LEVELS, STATUS, MOVE_TYPES } from '@/constants';
import shuffle from '@/utils/shuffle';
import Piece from '@/components/Piece';
import { BOARD_SIZES, DIRS, USERS } from './constants';

export const initUsers = () => USERS.map(name => ({
  name,
  color: null,
}));

export const initPieces = () => shuffle(
  Object.keys(COLORS)
    .map(color => (
      PIECES.reduce((current, piece) => {
        for (let i = 0; i < piece.count; i++) {
          current.push({
            ...piece,
            name: piece.name[color],
            color,
            id: shortid.generate(),
          });
        }
      
        return current;
      }, [])
    ))
    .reduce((current, next) => current.concat(next))
);

const indexToPos = index => ({
  x: index % BOARD_SIZES.COLS,
  y: Math.floor(index / BOARD_SIZES.COLS),
})

const posToIndex = pos => ((pos.y * BOARD_SIZES.COLS) + pos.x);

const isEqual = (pos1, pos2) => (
  pos1.x === pos2.x && pos1.y === pos2.y
);

export const getMoveType = (current, target, pieces) => {
  const currentPos = indexToPos(current);
  const targetPos = indexToPos(target);

  // left, right, up, down
  for (let i = 0; i < DIRS.length; i++) {
    const nextPos = {
      x: currentPos.x + DIRS[i].x,
      y: currentPos.y + DIRS[i].y,
    };

    if (isEqual(nextPos, targetPos)) {
      return MOVE_TYPES.STEP;
    }
  }

  if (pieces[current].level !== LEVELS.CANNONS) {
    return MOVE_TYPES.NONE;
  }

  for (let i = 0; i < DIRS.length; i++) {
    let hasPiece = false;
    let nextPos = { ...currentPos };

    while (1) {
      nextPos = {
        x: nextPos.x + DIRS[i].x,
        y: nextPos.y + DIRS[i].y,
      }

      const nextPiece = pieces[posToIndex(nextPos)];
      if (!nextPiece) {
        break;
      }

      const { status } = nextPiece;
      if (isEqual(nextPos, targetPos)) {
        return hasPiece && status === STATUS.OPEN
          ? MOVE_TYPES.JUMP
          : MOVE_TYPES.NONE;
      }

      if (status === STATUS.DEAD) {
        continue;
      } else if (hasPiece) {
        break;
      }

      hasPiece = true;
    }
  }

  return MOVE_TYPES.NONE;
};

export const isBeatable = (currentPiece, targetPiece, moveType) => {
  if (targetPiece.status === STATUS.CLOSED
    || (targetPiece.status === STATUS.OPEN && currentPiece.color === targetPiece.color)) {
    return false;
  }

  if (targetPiece.status === STATUS.DEAD
    || moveType === MOVE_TYPES.JUMP) {
    return true;
  }

  switch (currentPiece.level) {
    case LEVELS.KING:
      return targetPiece.level !== LEVELS.PAWNS;
    case LEVELS.PAWNS:
      return targetPiece.level === LEVELS.PAWNS || targetPiece.level === LEVELS.KING;
    default:
      return currentPiece.level >= targetPiece.level
  }

  return false;
}