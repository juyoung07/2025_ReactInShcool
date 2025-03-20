import { useState } from "react";

// 함수 컴포넌트 정의
// (이름이 반드시 대문자로 시작!)
function App() {
	// 반복문, if, switch 등의 문법을 사용할 수 없음
	// map 함수를 사용하여 반복문을 대체

	const arr = ["a", "b", "c", "d", "e"];
	const itemList = (
		<ul>
			{/* jsx에서는 중괄호 안에 자바스크립트 코드를 넣을 수 있음 (물론 주석은 중괄호 안에 넣어야 함) */}
			{arr.map((item) => (
				<li>{item}</li>
			))}
			{/* <li>a</li> */}
		</ul>
	);

	const arr1 = ["I", "love", "you"];
	const arr2 = ["You", "love", "me"];
	const list1 = arr1.map((item) => <li>{item}</li>);
	const list2 = arr2.map((item) => <li>{item}</li>);

	return (
		// <div style="background-color: black;">
		// <div style={{ backgroundColor: "black" }}>	// 이처럼 카멜케이스를 사용해야 함
		<div style={{ backgroundColor: "grey" }}>
			{/* {}는 자바스크립트를 쓰겠다는,, 그래서 중괄호를 또 써야 함 */}
			{list1}
			<br />
			{list2}
		</div>
	);
}

export default App; // export default는 한 번만 사용 가능 (import를 중괄호 없이 사용 가능)
