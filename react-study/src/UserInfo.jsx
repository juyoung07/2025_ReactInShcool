// function UserInfo(props) {
// 	return (
// 		<h1>
// 			name: {props.name}, age: {props.age}
// 		</h1>
// 	);
// }

// 파라미터에서 "객체 비구조화 할당"을 수행
function UserInfo({ name, age }) {
	return (
		<h1>
			name: {name}, age: {age}
		</h1>
	);
}

export default UserInfo;
