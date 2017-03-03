const assert = require('assert');
const sudoku = require('../sudoku');

describe('Sudoku', function() {
  describe('backtracing', function() {
    it('should solve the sudoku problem', function() {
      const board = [
        "103000509".split(""),
        "002109400".split(""),
        "000704000".split(""),
        "300502006".split(""),
        "060000050".split(""),
        "700803004".split(""),
        "000401000".split(""),
        "009205800".split(""),
        "804000107".split(""),
      ];
      const expectedResponse = [
        "143628579".split(""),
        "572139468".split(""),
        "986754231".split(""),
        "391542786".split(""),
        "468917352".split(""),
        "725863914".split(""),
        "237481695".split(""),
        "619275843".split(""),
        "854396127".split(""),
      ];
      const response = sudoku.backtracking(board);

      assert.deepEqual(response, expectedResponse);
    });
  });
});
