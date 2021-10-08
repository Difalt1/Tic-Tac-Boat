import react from "react";
import ReactDOM from "react-dom";

class Game extends react.Component{
  constructor(props){
    super(props);
    this.state = {
      Squares: Array(9).fill("N")
    }
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  handleSquareClick(index) {
    console.log(`User clicked square ${index}`);
    const squares = this.state.Squares;
    squares[index] = "X";
    this.setState({Squares: squares});
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
      return <Square value={arrayElement} onClick={() => this.props.handleClick(index)} />;
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
      <button onClick={() => {
        this.props.onClick();
      }}
      >{this.props.value}</button>
      </>
    )
  }
}
ReactDOM.render(<Game />, document.getElementById("root"));