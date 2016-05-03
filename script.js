var BOARD_WIDTH = 10;
var BOARD_HEIGHT = 10;

var keyCodes = {
  left: 37,
  down: 40,
  up: 38,
  right: 39,
  enter: 13
};

var initCursor = function() {
  var location = { x: 0, y: 0 };

  return {
    move: function(x, y) {
      location.x = location.x + x;
      location.y = location.y + y;
    },
    getLocation: function() {
      return location;
    }
  }
};

var initGameBoard = function(width, height) {
  var board = [];

  for (var y = 0; y < height; y++) {
    var row = []
    for (var x = 0; x < width; x++) {
      row.push('O');
    }
    board.push(row);
  }

  return {
    setCharAtLoc: function(x, y, charCode) {
      board[y][x] = String.fromCharCode(charCode);
    },

    getBoard: function() {
      return board;
    }
  };
};

var createRowRenderer = function (row) {
  return function() {
    console.log(row);
  }
};

var createRow = function(length, y) {
  var result = '';
  var loc = cursor.getLocation();
  var b = board.getBoard();

  for (var x = 0; x < BOARD_WIDTH; x++) {
    if (y === loc.y && x === loc.x) {
      result += '[' + b[y][x] + ']';
    } else {
      result += ' ' + b[y][x] + ' ';
    }
  }

  return result;
};

var renderGameBoard = function(loc) {
  var result = [];

  for (var y = 0; y < BOARD_HEIGHT; y++) {
    var line = createRow(length, y);
    result.push(createRowRenderer(line))
  }

  return result;
};

var render = function() {
  var renderedBoard = renderGameBoard();
  console.log('\n');
  console.log('\n');
  console.log('\n');
  renderedBoard.forEach(log => log())
};

var print = function() {
  var boardWithoutSpaces = board.getBoard().map(function(row) {
    return '\n' + row.join('');
  }).join('')

  console.log(boardWithoutSpaces);
};

var cursor = initCursor();
var board = initGameBoard(BOARD_WIDTH, BOARD_HEIGHT);

document.body.addEventListener('keydown', function(e) {
  var keyCode = e.keyCode;

  if (keyCode === keyCodes.left) {
    cursor.move(-1, 0)
    render();
  } else if (keyCode === keyCodes.up) {
    cursor.move(0, -1)
    render();
  } else if (keyCode === keyCodes.down) {
    cursor.move(0, 1)
    render();
  } else if (keyCode === keyCodes.right) {
    cursor.move(1, 0)
    render();
  } else if (keyCode === keyCodes.enter) {
    print();
  }
});

document.body.addEventListener('keypress', function(e) {
  var loc;

  if (e.charCode && e.charCode !== keyCodes.enter) {
    loc = cursor.getLocation();
    board.setCharAtLoc(loc.x, loc.y, e.charCode)
    render();
  }
});

render();



