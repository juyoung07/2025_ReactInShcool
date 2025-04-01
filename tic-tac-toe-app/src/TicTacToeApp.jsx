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

// o, x 타일 스타일 추가
const oStyle = {
	color: "white",
	background: "black",
};
const xStyle = {
	color: "black",
	background: "white",
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

function Tile({ type, index, handleTileClick }) {
	// 스타일 적용..
	// if (type !== null) {
	// 	if (type === "o") finalStyle = { ...tileStyle, ...oStyle };
	// 	if (type === "x") finalStyle = { ...tileStyle, ...xStyle };
	// }

	return (
		<button
			onClick={() => handleTileClick(type, index)}
			style={{
				...tileStyle,
				...(type === null ? {} : type === "o" ? oStyle : xStyle),
			}}
		>
			{type !== null ? type : "-"}
		</button>
	);
}

function TicTacToeApp() {
	const [turn, setTurn] = useState("o");
	const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
	const [winner, setWinner] = useState(null);

	useEffect(() => {
		const currentWinner = checkWinner(gameBoard);
		if (currentWinner === null) {
			// 모든 타일이 null이 아닐 때
			if (gameBoard.every((tile) => tile !== null)) {
				setWinner("draw");
			}
		} else {
			setWinner(currentWinner);
		}

		// console.log(checkWinner(gameBoard));
	}, [gameBoard]);

	const handleTileClick = (type, index) => {
		if (type === null && winner === null) {
			setGameBoard((board) => {
				const copy = [...board];
				copy[index] = turn;
				return copy;
			});
			setTurn((turn) => (turn === "o" ? "x" : "o"));
		}
	};

	return (
		<div>
			{winner === null ? (
				<div>
					<h1>Current Turn : {turn}</h1>
					next Turn : {turn === "o" ? "x" : "o"}
				</div>
			) : (
				<div>
					{winner === "draw" ? (
						<h1>비겼습니다.</h1>
					) : (
						<h1>{winner}가 이겼습니다.</h1>
					)}
					<button
						onClick={() => {
							setTurn("o");
							setGameBoard(Array(9).fill(null));
							setWinner(null);
						}}
					>
						다시하기
					</button>
				</div>
			)}

			<div style={boardStyle}>
				{gameBoard.map((tile, index) => {
					return (
						<Tile
							key={index}
							type={tile}
							index={index}
							handleTileClick={handleTileClick}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default TicTacToeApp;
