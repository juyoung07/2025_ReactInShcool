import { useState } from "react";

// Hook => 함수인데, 이름이 "use"로 시작하는 특수한 역할을 하는 함수
// useState, useEffect, useRef 같은 훅이 존재 (다른 훅도 있고 직접 만들 수도 있음)

function UseStateStudy() {
	const [data, setData] = useState({ count: 0 });
	return (
		<div>
			<h1>{data.count}</h1>
			<button
				onClick={() =>
					setData((prev) => {
						return { ...prev, count: prev.count + 1 };
					})
				}
			>
				+
			</button>
			<button
				onClick={() =>
					setData((prev) => {
						return { ...prev, count: prev.count - 1 };
					})
				}
			>
				-
			</button>
		</div>
	);
}

export default UseStateStudy;
