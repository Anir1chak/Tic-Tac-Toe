import React, { useState, useRef } from 'react';
import './Tictactoe.css';

const Tictactoe = () => {
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);
  const box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const board = [["", "", ""], ["", "", ""], ["", "", ""]];
  const human = "x";
  const ai = "o";
  const scores = {
    "x": -1,
    "o": 1,
    "tie": 0
  };

  const ai_next_turn = () => {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = ai;
          let score = minimax(board, 0, false);
          console.log(score);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    if (bestMove) {
      board[bestMove.i][bestMove.j] = ai;
      const num = (bestMove.i * 3) + bestMove.j;
      box_array[num].current.innerHTML = `<span class='o'>O</span>`;
      checkWin(false);
      console.log(board);
    }
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = checkWin(true);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    const row = Math.floor(num / 3);
    const col = num % 3;
    if (board[row][col] !== "") {
      return;
    }
    e.target.innerHTML = `<span class='x'>X</span>`;
    board[row][col] = human;
    if (checkWin(false) === null) {
      ai_next_turn();
    }
  };

  const checkWin = (isAi) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
        if (!isAi) {
        
          Won(board[i][0]);
        }
        return board[i][0];
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
        if (!isAi) {
          Won(board[0][i]);
        }
        return board[0][i];
      }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
      if (!isAi) {
        
        Won(board[0][0]);
      }
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
      if (!isAi) {
        Won(board[0][2]);
      }
      return board[0][2];
    }
    let full = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          full = false;
          break;
        }
      }
    }
    if (full) {
      if (!isAi) {
        Won("tie");
      }
      return 'tie';
    }
    return null;
  };

  const Won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `CONGRATULATIONS: X`;
    } else if (winner === "o") {
      titleRef.current.innerHTML = `CONGRATULATIONS: O`;
    } else {
      titleRef.current.innerHTML = `IT'S A TIE!`;
    }
  };

  const reset = () => {
    setLock(false);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }
    titleRef.current.innerHTML = 'TIC-TAC-TOE IN REACT';
    box_array.forEach((e) => {
      e.current.innerHTML = "";
    });
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>TIC-TAC-TOE IN REACT</h1>
      <div className="Board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
          <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
          <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
          <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
          <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
          <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
          <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
        </div>
      </div>
      <button className="Reset" onClick={reset}>Reset</button>
    </div>
  );
}

export default Tictactoe;
