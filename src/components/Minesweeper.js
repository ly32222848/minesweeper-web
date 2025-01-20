import React, { useState, useCallback, useEffect } from 'react';
import { Flag, Bomb } from 'lucide-react';

const BOARD_SIZE = 10;
const MINES_COUNT = 10;

// 创建空棋盘
const createEmptyBoard = () => {
  return Array(BOARD_SIZE).fill().map(() => 
    Array(BOARD_SIZE).fill().map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0
    }))
  );
};

// 随机放置地雷
const placeMines = (board, minesCount) => {
  let minesPlaced = 0;
  while (minesPlaced < minesCount) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    
    if (!board[y][x].isMine) {
      board[y][x].isMine = true;
      minesPlaced++;
    }
  }
  return board;
};

// 计算邻近地雷数
const calculateNeighbors = (board) => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (!board[y][x].isMine) {
        let count = 0;
        directions.forEach(([dy, dx]) => {
          const newY = y + dy;
          const newX = x + dx;
          if (newY >= 0 && newY < BOARD_SIZE && newX >= 0 && newX < BOARD_SIZE) {
            if (board[newY][newX].isMine) count++;
          }
        });
        board[y][x].neighborMines = count;
      }
    }
  }
  return board;
};

// 初始化游戏板
const initializeBoard = () => {
  let board = createEmptyBoard();
  board = placeMines(board, MINES_COUNT);
  board = calculateNeighbors(board);
  return board;
};

const Minesweeper = () => {
  const [board, setBoard] = useState(() => initializeBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagsPlaced, setFlagsPlaced] = useState(0);

  // 检查胜利条件
  const checkWinCondition = useCallback((currentBoard) => {
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const cell = currentBoard[y][x];
        if (!cell.isMine && !cell.isRevealed) return false;
      }
    }
    return true;
  }, []);

  // 递归显示空白格子
  const revealEmpty = (currentBoard, y, x) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    directions.forEach(([dy, dx]) => {
      const newY = y + dy;
      const newX = x + dx;

      if (
        newY >= 0 && newY < BOARD_SIZE &&
        newX >= 0 && newX < BOARD_SIZE &&
        !currentBoard[newY][newX].isRevealed &&
        !currentBoard[newY][newX].isFlagged
      ) {
        currentBoard[newY][newX].isRevealed = true;
        if (currentBoard[newY][newX].neighborMines === 0) {
          revealEmpty(currentBoard, newY, newX);
        }
      }
    });
  };

  // 处理点击事件
  const handleCellClick = (y, x) => {
    if (gameOver || gameWon || board[y][x].isFlagged || board[y][x].isRevealed) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    const cell = newBoard[y][x];

    if (cell.isMine) {
      // 触碰地雷，游戏结束
      cell.isRevealed = true;
      setBoard(newBoard);
      setGameOver(true);
      return;
    }

    cell.isRevealed = true;
    if (cell.neighborMines === 0) {
      revealEmpty(newBoard, y, x);
    }

    setBoard(newBoard);
    if (checkWinCondition(newBoard)) {
      setGameWon(true);
    }
  };

  // 处理右键点击（插旗）
  const handleContextMenu = (e, y, x) => {
    e.preventDefault();
    if (gameOver || gameWon || board[y][x].isRevealed) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    const cell = newBoard[y][x];

    if (!cell.isFlagged && flagsPlaced >= MINES_COUNT) return;

    cell.isFlagged = !cell.isFlagged;
    setBoard(newBoard);
    setFlagsPlaced(prev => cell.isFlagged ? prev + 1 : prev - 1);
  };

  // 重新开始游戏
  const resetGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
    setGameWon(false);
    setFlagsPlaced(0);
  };

  // 获取单元格的显示内容
  const getCellContent = (cell) => {
    if (cell.isFlagged) {
      return <Flag className="w-4 h-4 text-red-500" />;
    }
    if (!cell.isRevealed) {
      return null;
    }
    if (cell.isMine) {
      return <Bomb className="w-4 h-4" />;
    }
    return cell.neighborMines > 0 ? cell.neighborMines : null;
  };

  // 获取单元格的样式
  const getCellStyle = (cell) => {
    if (cell.isRevealed) {
      return cell.isMine ? 'bg-red-500' : 'bg-gray-200';
    }
    return 'bg-gray-300 hover:bg-gray-400';
  };

  // 获取数字的颜色
  const getNumberColor = (number) => {
    const colors = [
      '',
      'text-blue-600',
      'text-green-600',
      'text-red-600',
      'text-blue-900',
      'text-red-900',
      'text-cyan-600',
      'text-black',
      'text-gray-600'
    ];
    return colors[number] || '';
  };

  return (
    <div className="flex flex-col items-center p-4 select-none">
      <div className="mb-4 flex gap-4 items-center">
        <div className="text-lg">
          剩余地雷: {MINES_COUNT - flagsPlaced}
        </div>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重新开始
        </button>
      </div>

      {(gameOver || gameWon) && (
        <div className="mb-4 text-xl font-bold">
          {gameWon ? '恭喜你赢了！' : '游戏结束！'}
        </div>
      )}

      <div className="inline-block border-2 border-gray-400">
        {board.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <button
                key={`${y}-${x}`}
                className={`w-8 h-8 flex items-center justify-center border border-gray-400 ${getCellStyle(cell)}`}
                onClick={() => handleCellClick(y, x)}
                onContextMenu={(e) => handleContextMenu(e, y, x)}
                disabled={gameOver || gameWon}
              >
                <span className={`${getNumberColor(cell.neighborMines)}`}>
                  {getCellContent(cell)}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        左键点击揭示格子，右键点击插旗标记
      </div>
    </div>
  );
};

export default Minesweeper;
