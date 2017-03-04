const assert = require('assert');
const sudoku = require('../sudoku');

describe('Sudoku', function() {
  describe('backtracing', function() {
    it('should solve the sudoku problem', function() {
      const board = [
        '103000509'.split(''),
        '002109400'.split(''),
        '000704000'.split(''),
        '300502006'.split(''),
        '060000050'.split(''),
        '700803004'.split(''),
        '000401000'.split(''),
        '009205800'.split(''),
        '804000107'.split(''),
      ];
      const expectedResponse = [
        '143628579'.split(''),
        '572139468'.split(''),
        '986754231'.split(''),
        '391542786'.split(''),
        '468917352'.split(''),
        '725863914'.split(''),
        '237481695'.split(''),
        '619275843'.split(''),
        '854396127'.split(''),
      ];
      const response = sudoku.backtracking(board);

      assert.deepEqual(response, expectedResponse);
    });
  });

  describe('isDuplicated', function() {
    it('Should tell if the number is not duplicated in the array', function() {
      const line = '103000509'.split('');
      const number = '1';
      const index = 0;
      const response = sudoku.isDuplicated(number, index, line);

      assert(!response);
    });
    it('Should tell if the number is duplicated in the array', function() {
      const line = '113000509'.split('');
      const number = '1';
      const index = 0;
      const response = sudoku.isDuplicated(number, index, line);
      assert(response);
    });
  });

  describe('findCandidates', function() {
    it('Should find valid candidates for the position', function() {
      const board = [
        '103000509'.split(''),
        '002109400'.split(''),
        '000704000'.split(''),
        '300502006'.split(''),
        '060000050'.split(''),
        '700803004'.split(''),
        '000401000'.split(''),
        '009205800'.split(''),
        '804000107'.split(''),
      ];
      const lineIndex = 0;
      const colIndex = 1;
      const response = sudoku.findCandidates(board, lineIndex, colIndex);

      assert.deepEqual(response, '46'.split(''));
    });
  });

  describe('blocks', function() {
    it('Should convert 3x3 blocks into lines', function() {
      const board = [
        '103000509'.split(''),
        '002109400'.split(''),
        '000704000'.split(''),
        '300502006'.split(''),
        '060000050'.split(''),
        '700803004'.split(''),
        '000401000'.split(''),
        '009205800'.split(''),
        '804000107'.split(''),
      ];
      const expectedResponse = [
        '103002000'.split(''),
        '000109704'.split(''),
        '509400000'.split(''),
        '300060700'.split(''),
        '502000803'.split(''),
        '006050004'.split(''),
        '000009804'.split(''),
        '401205000'.split(''),
        '000800107'.split(''),
      ];
      const response = sudoku.blocks(board);

      assert.deepEqual(response, expectedResponse);
    });
  });
});
