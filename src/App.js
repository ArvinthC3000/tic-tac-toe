import React from 'react';                    // import React,{ Component } from 'react';
import './App.css';
import {Helloworld} from './Helloworld'

class App extends React.Component {           // class App extends React {

  constructor() {
    super()
    this.state = {
      winner : undefined,
    };
    this.gameState ={
      turn: 'X',
      gameEnded: false,
      board: Array(9).fill(''),
      totalMoves: 0
    }
  }



  clicked(event) {

    if(this.gameState.gameEnded) return;

    if(this.gameState.board[event.target.dataset.square] === ''){
      this.gameState.board[event.target.dataset.square] = this.gameState.turn;
      event.target.innerText = this.gameState.turn;

      this.gameState.turn = this.gameState.turn === 'X' ? 'O' : 'X';
       
      this.gameState.totalMoves++;
    }
    
    var result = this.checkWinner()

    if(result === 'X'){
      this.gameState.gameEnded = true;
      this.setState({
        winner : 'X',
        winnerLine: 'Match won by X'
      })
    } else if (result === 'O'){
      this.gameState.gameEnded = true;
      this.setState({
        winner : 'O',
        winnerLine: 'Match won by O'
      })
    } else if(result ==='draw'){
      this.gameState.gameEnded = true;
      this.setState({
        winner: 'draw',
        winnerLine: 'Match is drawn'
      })
    }
    console.log(result)    
  }

  checkWinner(){
    var moves = [
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
      [0,1,2],
      [3,4,5],
      [6,7,8]];
    var board = this.gameState.board;
    for(let i=0;i<moves.length;i++){
      if(board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]])
      return board[moves[i][0]];
    }

    console.log(this.gameState.totalMoves)
    if(this.gameState.totalMoves === 9 ){
      return 'draw';
    }
  }

  replay(event){
    
    this.gameState.board = '';
    console.log("clicked")
  }

  render() {
    return (
      <div id="game">
        <Helloworld />
        <div id="status">{this.state.winnerLine}</div>
        <div id="head">
          TicTacToe
        </div>
        <div id="board" onClick={(e)=>this.clicked(e)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
        <div id="replay">
          {/* <button type="button" onClick={this.replay()}>Replay</button> */}
        </div>
      </div>
    );
  }
}

export default App;
