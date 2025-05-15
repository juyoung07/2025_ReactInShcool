import { useNavigate } from "react-router-dom";

type QuizResultData = {
	score: number; // 맞춘 문제 수
	total: number; // 총 문제 수
};

type QuizResultProps = {
	result: QuizResultData;
};

function QuizResult({ result }: QuizResultProps) {
	const navigate = useNavigate();

	return (
		<div>
			<h1>
				총 {result.total} 문제 중 {result.score} 문제를 맞추셨습니다.
			</h1>
			<button
				onClick={() => {
					// 다시 퀴즈 주소로 돌아가기
					navigate("/quiz");
				}}
			>
				다시 풀기
			</button>
		</div>
	);
}

export default QuizResult;
