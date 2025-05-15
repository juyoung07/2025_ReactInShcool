import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Quiz = {
	id: string;
	question: string;
	choices: string[];
	answer: number;
};

const fetchQuizzes = async () => {
	try {
		const response = await axios.get<Quiz[]>("/api/quizzes");
		return response.data;
	} catch (e) {
		console.error("퀴즈 데이터를 가져오는 중 오류 발생 : ", e);
		throw e;
	}
};

const deleteQuiz = async (id: string) => {
	try {
		await axios.delete(`/api/quizzes/${id}`);
	} catch (e) {
		console.error("퀴즈 삭제 중 오류 발생 : ", e);
		throw e;
	}
};

export default function ManageQuiz() {
	const [quizzes, setQuizzes] = useState<Quiz[] | null>(null); // null말고 빈 배열도 가능
	const navigate = useNavigate();

	useEffect(() => {
		// useEffect는 바로 리턴해줘야 함
		(async () => {
			const quizzes = await fetchQuizzes();
			setQuizzes(quizzes);
		})();
	}, []);

	return (
		<div>
			<h1>퀴즈 관리</h1>
			<button onClick={() => navigate("/create")}>새 퀴즈 생성</button>
			{quizzes?.map((q) => (
				<div key={q.id}>
					<h3>{q.question}</h3>
					{q.choices.map((c, idx) => {
						return (
							<span
								key={idx} // 순서가 바뀌지 않는다는 가정 하에.
								style={q.answer === idx ? { color: "red" } : {}}
							>
								{idx + 1}. {c}&nbsp;
							</span>
						);
					})}
				</div>
			))}
		</div>
	);
}
