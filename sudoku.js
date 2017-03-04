const readline = require('readline');
const SUDOKU_BOARD_SIZE = 9;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.once('line', (count) => {
  let board = [];

  rl.on('line', (input) => {
    board.push(input.toString().trim().split(""));
    if (board.length === SUDOKU_BOARD_SIZE) {
      const result = backtracking(board);
      if (result) {
        printBoard(result);
      }
      board = [];
    }
  });
});

function backtracking(board) {
  if (reject(board)) {
    return false;
  }
  if (accept(board)) {
    return board;
  }
  for (const candidate of generator(board)) {
    const solution = backtracking(candidate);
    if (solution) {
      return solution;
    }
  }
  return false;
}

function* generator(board) {
  const lineIndex = board.findIndex((line) => {
    return line.some((number) => number === "0");
  });
  const colIndex = board[lineIndex].findIndex((number) => number === "0");

  const solutions = generate(board, lineIndex, colIndex);
  for (const solution of solutions) {
      yield solution;
  }
}

function generate(board, lineIndex, colIndex) {
  const solutions = [];
  const candidates = findCandidates(board, lineIndex, colIndex);
  candidates.forEach((candidate) => {
    const solution = board.slice();
    solution[lineIndex] = solution[lineIndex].slice();
    solution[lineIndex][colIndex] = candidate;
    solutions.push(solution);
  });
  return solutions;
}

const candidates = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function findCandidates(board, lineIndex, colIndex) {
  const currentNumbers = board[lineIndex].filter((el, index) => index !== colIndex && el !== "0")
    .concat(board.filter((line, index) => lineIndex !== index)
      .map((line) => line[colIndex])
      .filter(number => number !== "0")
    );
  return candidates;//.filter((number) => currentNumbers.includes(number));
}

function printBoard(board) {
  board.forEach((line) => console.log(line.join('')));
}

function isDuplicated(number, index, line) {
  return number !== '0' && line.lastIndexOf(number) !== index;
}

function reject(solution) {
  return solution.some((line) => {
    return line.some(isDuplicated);
  }) || rotate(solution).some((line) => {
    return line.some(isDuplicated);
  }) || blocks(solution).some((line) => {
    return line.some(isDuplicated);
  }) ;
}

function accept(solution) {
  return !solution.some((line) => {
    return line.some((number) => number === '0');
  });
}

function rotate(board) {
  const reverseBoard = [];
  board.forEach((line) => {
      line.forEach((number, index) => {
        reverseBoard[index] = reverseBoard[index] || [];
        reverseBoard[index].push(number);
      });
  });
  return reverseBoard;
}

/* Converts from
|A|A|B|B|C|C|
|A|A|B|B|C|C|
...
|G|G|H|H|I|I|
|G|G|H|H|I|I|
to
|A|A|A|A|
|B|B|B|B|
...
|I|I|I|I|
*/
function blocks(board) {
  const blocksBoard = [];
  board.forEach((line, lineIndex) => {
      line.forEach((number, colIndex) => {
        const index = Math.floor((lineIndex) / 3) * 3 + (Math.floor((colIndex) / 3));
        blocksBoard[index] = blocksBoard[index] || [];
        blocksBoard[index].push(number);
      });
  });
  return blocksBoard;
}

module.exports = {
  backtracking,
  findCandidates,
  isDuplicated,
  rotate,
  blocks,
};
