export const COLORS = {
  RED: 'RED',
  BLACK: 'BLACK',
};

export const LEVELS = {
  KING: 7,
  ADVISORS: 6,
  ELEPHANTS: 5,
  ROOKS: 4,
  KNIGHTS: 3,
  CANNONS: 2,
  PAWNS: 1,
};

export const MOVE_TYPES = {
  NONE: 'NONE',
  STEP: 'STEP',
  JUMP: 'JUMP',
};

export const STATUS = {
  OPEN: 'OPEN',
  DEAD: 'DEAD',
  CLOSED: 'CLOSED',
};

export const PIECES = [
  {
    name: {
      [COLORS.BLACK]: '將',
      [COLORS.RED]: '帥',
    },
    count: 1,
    level: LEVELS.KING,
    status: STATUS.CLOSED,
  },
  {
    name: {
      [COLORS.BLACK]: '士',
      [COLORS.RED]: '仕',
    },
    count: 2,
    level: LEVELS.ADVISORS,
    status: STATUS.CLOSED,
  },
  {
    name: {
      [COLORS.BLACK]: '象',
      [COLORS.RED]: '相',
    },
    count: 2,
    level: LEVELS.ELEPHANTS,
    status: STATUS.CLOSED,
  },
  {
    name: {
      [COLORS.BLACK]: '車',
      [COLORS.RED]: '俥',
    },
    count: 2,
    level: LEVELS.ROOKS,
    status: STATUS.CLOSED,
  },
  {
    name: {
      [COLORS.BLACK]: '馬',
      [COLORS.RED]: '傌',
    },
    count: 2,
    level: LEVELS.KNIGHTS,
    status: STATUS.CLOSED,
  },
  {
    name: {
      [COLORS.BLACK]: '包',
      [COLORS.RED]: '炮',
    },
    count: 2,
    level: LEVELS.CANNONS,
    status: STATUS.CLOSED,
  },
  {
    name: {
      [COLORS.BLACK]: '卒',
      [COLORS.RED]: '兵',
    },
    count: 5,
    level: LEVELS.PAWNS,
    status: STATUS.CLOSED,
  },
];