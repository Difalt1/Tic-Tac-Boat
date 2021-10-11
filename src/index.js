import react from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Game extends react.Component{
  constructor(props){
    super(props);
    this.state = {
      Squares: Array(9).fill(null),
      nextSymbol: "O",
      gameWon: false
    }
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }
  checkWinning(squares) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      let [a, b, c] = winningCombinations[i];
      if (
        (squares[a] === "X" || squares[a] === "O") &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return winningCombinations[i];
      }
    }
  }
  handleSquareClick(index) {
    console.log(`User clicked square ${index}`);
    const squares = this.state.Squares;
    if (squares[index] !== null || this.state.gameWon) {
      return;
    }
    
    squares[index] = this.state.nextSymbol;

    let winningCombination = this.checkWinning(squares);
    if (winningCombination) {
      console.log(`Win ${winningCombination}`);
      this.setState({ gameWon: true });
    }
    
    const nextSymbol = this.state.nextSymbol === "X" ? "O" : "X";
    this.setState({Squares: squares, nextSymbol: nextSymbol});
  }

  render(){
    // Use Board and pass down the Squares 
    return(
      <>
      <Board squares={this.state.Squares} handleClick={this.handleSquareClick}/>
      </>
    )
  }
}
class Board extends react.Component{
  constructor(props){
    super(props);
  }
  render(){
    return this.props.squares.map( (arrayElement, index) => {
      return <div className="square">
          <Square value={arrayElement} onClick={() => this.props.handleClick(index)} />
          {(index + 1) % 3 === 0 ? <br/> : <></>}
        </div>
    });
  }
  // create a render method and return a list of Squares starting from the array you got as input
}
class Square extends react.Component{
  constructor(props){
    super(props);
  }


  render(){
    return(
      <>
      <button className="square" onClick={() => {
        this.props.onClick();
      }}
      >{this.props.value || <div>&nbsp;</div>}</button>
      </>
    )
  }
}
ReactDOM.render(<Game />, document.getElementById("root"));