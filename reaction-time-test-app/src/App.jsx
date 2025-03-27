import { act, useState } from "react";

const MIN_DELAY_MS = 2000;
const MAX_ADDITIONAL_TIME = 1000;

const DEACTIVE_COLOR = "grey";
const ACTIVE_COLOR = "green";

const colorByState = {
	ready: DEACTIVE_COLOR,
	start: DEACTIVE_COLOR,
	test: ACTIVE_COLOR,
	end: DEACTIVE_COLOR,
};

const defaultButtonStyle = {
	width: 200,
	height: 50,
	fontSize: 26,
	color: "white",
	border: "0px",
	borderRadius: 10,
};

const containerStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
	textAlign: "center",
};

const contentBoxStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "500px",
	padding: "30px",
	border: "2px solid black",
	borderRadius: "10px",
	backgroundColor: "white",
};

function App() {
	const [state, setState] = useState("ready"); // 상태
	const [record, setRecord] = useState({
		start: null,
		end: null,
	});

	const backgroundColor = colorByState[state];

	let instruction; // 지금은 undefined
	let actionButton;

	if (state === "ready") {
		instruction = <h1>버튼을 누르면 시작합니다.</h1>;
		actionButton = (
			<button
				style={{ backgroundColor }}
				onClick={() => {
					setState("start");
					setTimeout(() => {
						setState("test");

						// start 기록
						// setRecord((r) => { return { ...r, start: Date.now() }; });
						setRecord((r) => ({ ...r, start: Date.now() }));
					}, 2000);
				}}
			>
				시작
			</button>
		);
	} else if (state === "start") {
		instruction = <h1>버튼이 녹색이 되면 누르세요.</h1>;
		actionButton = <button style={{ backgroundColor }}>클릭</button>;
	} else if (state === "test") {
		instruction = <h1>클릭하세요!</h1>;
		actionButton = (
			<button
				style={{ ...defaultButtonStyle, backgroundColor }}
				onClick={() => {
					const randomTime =
						Math.random() * MAX_ADDITIONAL_TIME + MIN_DELAY_MS;
					setState("end");

					// end 기록
					setRecord((r) => ({ ...r, end: Date.now() }));
				}}
			>
				클릭
			</button>
		);
	} else if (state === "end") {
		// 최종결과 계산
		const reactionTime = record.end - record.start;
		instruction = <h1>반응 속도 : {reactionTime}ms</h1>;
		actionButton = (
			<button
				style={{ backgroundColor }}
				onClick={() => setState("ready")}
			>
				다시하기
			</button>
		);
	}

	return (
		<div style={{ ...containerStyle, backgroundColor }}>
			<div style={contentBoxStyle}>
				{instruction}
				{actionButton}
			</div>
		</div>
	);
}

export default App;
