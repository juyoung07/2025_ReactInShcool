import { useState, useEffect } from "react";

const boardStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridTemplateRows: "repeat(3, 1fr)",
	gap: "4px",
	width: "300px",
	height: "300px",
};

const tileStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	fontSize: "2rem",
	fontWeight: "bold",
	background: "#eee",
	cursor: "pointer",
	border: "2px solid gray",
};

function checkWinner(tiles) {
	for (let i = 0; i < 9; i += 3) {
		if (
			tiles[i] !== null &&
			tiles[i] === tiles[i + 1] &&
			tiles[i] === tiles[i + 2]
		) {
			return tiles[i];
		}
	}

	for (let i = 0; i < 3; i++) {
		if (
			tiles[i] !== null &&
			tiles[i] === tiles[i + 3] &&
			tiles[i] === tiles[i + 6]
		) {
			return tiles[i];
		}
	}
	if (tiles[0] !== null && tiles[0] === tiles[4] && tiles[0] === tiles[8]) {
		return tiles[0];
	}
	if (tiles[2] !== null && tiles[2] === tiles[4] && tiles[2] === tiles[6]) {
		return tiles[2];
	}
	return null;
}

function Tile({ type, index, turn, setTurn, setGameBoard }) {
	return (
		<button
			onClick={() => {
				// 로직
				if (type === null) {
					setGameBoard((board) => {
						const copy = [...board];
						copy[index] = turn;
						return copy;
					});
					setTurn((turn) => (turn === "o" ? "x" : "o"));
				}
			}}
			style={tileStyle}
		>
			{type !== null ? type : "-"}
		</button>
	);
}

function TicTacToeApp() {
	const [turn, setTurn] = useState("o");
	const [gameBoard, setGameBoard] = useState(Array(9).fill(null));

	useEffect(() => {
		console.log(checkWinner(gameBoard));
	}, [gameBoard]);

	return (
		<div>
			<h1>Current Turn : {turn}</h1>
			next Turn : {turn === "o" ? "x" : "o"}
			<div style={boardStyle}>
				{gameBoard.map((tile, index) => {
					return (
						<Tile
							index={index}
							setTurn={setTurn}
							setGameBoard={setGameBoard}
							turn={turn}
							type={tile}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default TicTacToeApp;
