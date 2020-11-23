import React, { Component } from "react";
import Box from "./Box";
import "./TicTacToe.scss";

const defaultState = {
  move: `O`,
  _0: "",
  _1: "",
  _2: "",
  _3: "",
  _4: "",
  _5: "",
  _6: "",
  _7: "",
  _8: "",
  moves: 0
};
export default class TicTacToe extends Component {
  state = {
    winningCombinations: [
      "_0&_1&_2",
      "_3&_4&_5",
      "_6&_7&_8",
      "_0&_3&_6",
      "_1&_4&_7",
      "_2&_5&_8",
      "_0&_4&_8",
      "_2&_4&_6"
    ],
    currState: { ...defaultState },
    prevState: { ...defaultState },
    result: ""
  };
  setOn = key => {
    let { currState, prevState, result } = this.state;
    if (!result) {
      prevState = { ...currState };
      currState[key] = currState.move;

      currState.move = currState.move === `O` ? `X` : `O`;
      currState.moves = currState.moves + 1;
      this.setState({ prevState, currState }, () => {
        const { currState, prevState, winningCombinations } = this.state;
        let doesMatchWithWinningCombinations = false;
        if (currState.moves > 4) {
          winningCombinations.forEach((item, index) => {
            const keys = item.split("&");
            if (!doesMatchWithWinningCombinations) {
              if (
                currState[keys[0]] !== "" &&
                currState[keys[1]] !== "" &&
                currState[keys[2]] !== "" &&
                currState[keys[0]] === currState[keys[1]] &&
                currState[keys[1]] === currState[keys[2]]
              )
                doesMatchWithWinningCombinations = true;
            }
          });
        }
        if (doesMatchWithWinningCombinations) {
          this.setState({ result: `${prevState.move} is winner` });
        } else {
          if (currState.moves === 9) {
            this.setState({ result: `no winner` });
          }
        }
      });
    }
  };
  resetGame = () => {
    this.setState({
      currState: { ...defaultState },
      prevState: { ...defaultState },
      result: ""
    });
  };
  goBackOneStep = () => {
    this.setState({ currState: { ...this.state.prevState }, result: "" });
  };
  render() {
    const { move, _0, _1, _2, _3, _4, _5, _6, _7, _8 } = this.state.currState;
    const { currState, prevState, result } = this.state;
    return (
      <div className="tic-tac-toe container">
        <h2 className={`${result ? "red" : move == "O" ? "green" : "red"}`}>
          {result ? `Game Over` : `${move}'s Turn`}
        </h2>

        <div>
          <div className="row">
            <Box key="_0" position="_0" value={_0} setOn={this.setOn} />
            <Box key="_1" position="_1" value={_1} setOn={this.setOn} />
            <Box key="_2" position="_2" value={_2} setOn={this.setOn} />
          </div>
          <div className="row">
            <Box key="_3" position="_3" value={_3} setOn={this.setOn} />
            <Box key="_4" position="_4" value={_4} setOn={this.setOn} />
            <Box key="_5" position="_5" value={_5} setOn={this.setOn} />
          </div>
          <div className="row">
            <Box key="_6" position="_6" value={_6} setOn={this.setOn} />
            <Box key="_7" position="_7" value={_7} setOn={this.setOn} />
            <Box key="_8" position="_8" value={_8} setOn={this.setOn} />
          </div>
          <div className="row">
            {JSON.stringify(prevState) !== JSON.stringify(currState) && (
              <div className="col-md-4" onClick={this.goBackOneStep}>
                Go back one step
              </div>
            )}
            {JSON.stringify(defaultState) !== JSON.stringify(currState) && (
              <div className="col-md-4" onClick={this.resetGame}>
                Reset Game
              </div>
            )}
            {result && <div className="col-md-4">{result}</div>}
          </div>
        </div>
      </div>
    );
  }
}
