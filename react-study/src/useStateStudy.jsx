import { useState } from "react";

// Hook => 함수인데, 이름이 "use"로 시작하는 특수한 역할을 하는 함수
// useState, useEffect, useRef 같은 훅이 존재 (다른 훅도 있고 직접 만들 수도 있음)

function UseStateStudy() {
	// useState(초기값)
	// 초기에는 [0, 세터함수] <= 이렇게 생긴 배열 반환
	// 배열 비구조화 할당을 함
	const [count, setCount] = useState(0);

	return (
		<div>
			<h1>{count}</h1>
			{/* onClick={() => setCount(count + 1)}는 직접 증가시키기 때문에 함수로 쓰기 */}
			<button onClick={() => setCount((c) => c + 1)}>증가</button>
			<button onClick={() => setCount((c) => c - 1)}>감소</button>
		</div>
	);
}

export default UseStateStudy;
