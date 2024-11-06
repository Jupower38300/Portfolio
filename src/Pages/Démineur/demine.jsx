import React from "react";
import PropTypes from "prop-types";
import "./styled.css"; // Import the CSS file

class Cell extends React.Component {
  getValue() {
    const { value } = this.props;

    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null; // Use a flag emoji
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour > 0) {
      return (
        <span className={`neighbour neighbour-${value.neighbour}`}>
          {value.neighbour}
        </span>
      ); // Return a span with a specific class for styling
    }
    return null; // Show nothing if neighbor count is 0
  }

  render() {
    const { value, onClick, cMenu, isGameOver } = this.props;
    const className = `cell ${value.isRevealed ? "" : "hidden"} ${
      value.isMine && isGameOver ? "is-mine" : ""
    } ${value.isFlagged ? "is-flag" : ""}`;

    return (
      <div className={className} onClick={onClick} onContextMenu={cMenu}>
        {this.getValue()}
      </div>
    );
  }
}

Cell.propTypes = {
  value: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isMine: PropTypes.bool.isRequired,
    neighbour: PropTypes.number.isRequired,
    isRevealed: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    isFlagged: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  cMenu: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool.isRequired, // New prop for game over status
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: this.initBoardData(props.height, props.width, props.mines),
      gameStatus: "Jeu en cours 🤔",
      mineCount: props.mines,
      isGameOver: false, // New state for game over
    };
  }

  initBoardData(height, width, mines) {
    let data = this.createEmptyArray(height, width);
    data = this.plantMines(data, height, width, mines);
    data = this.getNeighbours(data, height, width);
    return data;
  }

  createEmptyArray(height, width) {
    return Array.from({ length: height }, (v, i) =>
      Array.from({ length: width }, (v, j) => ({
        x: i,
        y: j,
        isMine: false,
        neighbour: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      }))
    );
  }

  getRandomNumber(dimension) {
    return Math.floor(Math.random() * dimension);
  }

  plantMines(data, height, width, mines) {
    let minesPlanted = 0;
  
    while (minesPlanted < mines) {
      const randomx = this.getRandomNumber(width);
      const randomy = this.getRandomNumber(height);
  
      // Vérifie que la case en bas à gauche n'est pas sélectionnée
      if (randomx === 0 && randomy === height - 1) {
        continue;
      }
  
      if (!data[randomy][randomx].isMine) {
        data[randomy][randomx].isMine = true;
        minesPlanted++;
      }
    }
  
    return data;
  }

  getNeighbours(data, height, width) {
    const updatedData = data.map((row) => [...row]); // Clone the data

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!data[i][j].isMine) {
          let mineCount = this.traverseBoard(i, j, data).filter(
            (cell) => cell.isMine
          ).length;
          updatedData[i][j].neighbour = mineCount;
          updatedData[i][j].isEmpty = mineCount === 0;
        }
      }
    }

    return updatedData;
  }

  traverseBoard(x, y, data) {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    const cells = [];

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (
        newX >= 0 &&
        newX < this.props.height &&
        newY >= 0 &&
        newY < this.props.width
      ) {
        cells.push(data[newX][newY]);
      }
    }

    return cells;
  }

  revealBoard() {
    const updatedData = this.state.boardData.map((row) =>
      row.map((cell) => ({ ...cell, isRevealed: true }))
    );
    this.setState({ boardData: updatedData });
  }

  revealEmpty(x, y, data) {
    const area = this.traverseBoard(x, y, data);
    area.forEach((value) => {
      if (
        !value.isFlagged &&
        !value.isRevealed &&
        (value.isEmpty || !value.isMine)
      ) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }

  handleCellClick(x, y) {
    if (
      this.state.boardData[x][y].isRevealed ||
      this.state.boardData[x][y].isFlagged
    )
      return;

    if (this.state.boardData[x][y].isMine) {
      this.setState({ gameStatus: "Perdu ☠️", isGameOver: true }); // Set game over state
      this.revealBoard();
      return;
    }

    const updatedData = this.state.boardData.slice();
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      this.revealEmpty(x, y, updatedData);
    }

    if (this.getHidden(updatedData).length === this.props.mines) {
      this.setState({ mineCount: 0, gameStatus: "Victoire! 🤩🤩🤩" });
      this.revealBoard();
    }

    this.setState({
      boardData: updatedData,
      mineCount: this.props.mines - this.getFlags(updatedData).length,
    });
  }

  handleContextMenu(e, x, y) {
    e.preventDefault();
    const updatedData = this.state.boardData.slice();
    let mines = this.state.mineCount;

    if (updatedData[x][y].isRevealed) return;

    updatedData[x][y].isFlagged = !updatedData[x][y].isFlagged;
    mines += updatedData[x][y].isFlagged ? -1 : 1;

    if (mines === 0) {
      const mineArray = this.getMines(updatedData);
      const flagArray = this.getFlags(updatedData);
      if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
        this.setState({ mineCount: 0, gameStatus: "Victoire! 🤩🤩🤩" });
        this.revealBoard();
      }
    }

    this.setState({ boardData: updatedData, mineCount: mines });
  }

  getMines(data) {
    return data.flat().filter((item) => item.isMine);
  }

  getFlags(data) {
    return data.flat().filter((item) => item.isFlagged);
  }

  getHidden(data) {
    return data.flat().filter((item) => !item.isRevealed);
  }

  renderBoard(data) {
    return data.map((datarow) => (
      <div key={datarow[0].x} className="row">
        {datarow.map((dataitem) => (
          <Cell
            key={dataitem.x * datarow.length + dataitem.y}
            onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
            cMenu={(e) => this.handleContextMenu(e, dataitem.x, dataitem.y)}
            value={dataitem}
            isGameOver={this.state.isGameOver} // Pass isGameOver state
          />
        ))}
      </div>
    ));
  }
  renderFace() {
    const { isGameOver, gameStatus } = this.state;
    let face = "🙂"; // Default face for ongoing game

    if (isGameOver) {
      face = gameStatus.includes("Victoire") ? "😎" : "☠️"; // Cool face for victory, skull for loss
    }

    return (
      <div className="face" onClick={() => this.resetGame()}>
        {face}
      </div>
    );
  }

  resetGame() {
    this.setState({
      boardData: this.initBoardData(
        this.props.height,
        this.props.width,
        this.props.mines
      ),
      gameStatus: "Jeu en cours 🤔",
      mineCount: this.props.mines,
      isGameOver: false,
    });
  }

  render() {
    return (
      <div className="board">
        <div className="game-info">
          {this.renderFace()} {/* Render face here */}
          <div className="mine-info">
            <span className="mine_img" role="img" aria-label="bomb">
              💣
            </span>{" "}
            {this.state.mineCount}
          </div>
        </div>
        <div className="game_board">
          {this.renderBoard(this.state.boardData)}
        </div>
      </div>
    );
  }
}

class Demine extends React.Component {
  state = {
    height: 10,
    width: 10,
    mines: 25,
  };

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="game_demin">
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}

export default Demine; // Correction: export Demine instead of Game
