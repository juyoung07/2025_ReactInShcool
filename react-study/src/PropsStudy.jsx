function PropsStudy(props) {
	const o = { a: 100 }; // {o.a}또는 {JSON.stringify(o)}를 통해 문자열로 변환하여 출력해야 오류 X
	return (
		<div>
			{props.hello} {props.mynum} {props.obj} {JSON.stringify(o)} {o.a}
		</div>
	);
}

export default PropsStudy;
