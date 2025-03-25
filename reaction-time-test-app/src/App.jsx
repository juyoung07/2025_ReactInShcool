import { act, useState } from "react";

function App() {
	const [state, setState] = useState("ready"); // 상태
	const [record, setRecord] = useState({
		start: null,
		end: null,
	});

	let instruction; // 지금은 undefined
	let actionButton;

	if (state === "ready") {
		instruction = <h1>버튼을 누르면 시작합니다.</h1>;
		actionButton = (
			<button
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
		actionButton = <button>클릭</button>;
	} else if (state === "test") {
		instruction = <h1>클릭하세요!</h1>;
		actionButton = (
			<button
				style={{ background: "green" }}
				onClick={() => {
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
			<button onClick={() => setState("ready")}>다시하기</button>
		);
	}

	return (
		<div>
			{instruction}
			{actionButton}
		</div>
	);
}

export default App;
