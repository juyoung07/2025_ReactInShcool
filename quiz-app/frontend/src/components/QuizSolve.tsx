import axios from "axios";
import { useEffect, useState } from "react";
import QuizResult from "./QuizResult";

// 중복되지만, 일단 OK
type Quiz = {
	id: string;
	question: string;
	choices: string[];
	answer: number;
};

// 퀴즈 상태를 위한 열거형
enum QuizStatus {
	LOADING, // 데이터 로딩 중
	IN_PROGRESS, // 퀴즈 진행 중
	COMPLETED, // 퀴즈 완료
}

const fetchQuizzes = async () => {
	try {
		const response = await axios.get<Quiz[]>(`api/quizzes`);
		return response.data;
	} catch (error) {
		console.error("퀴즈 데이터를 가져오는 중 오류 발생:", error);
		throw error;
	}
};

export default function QuizSolve() {
	// 모든 퀴즈 배열 상태
	const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
	// 현재 풀고 있는 퀴즈의 인덱스 상태
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	// 현재 퀴즈 컴포넌트의 진행 상태 (처음에는 로딩 상태로 설정)
	const [status, setStatus] = useState<QuizStatus>(QuizStatus.LOADING);
	// 퀴즈 점수 상태
	const [score, setScore] = useState<number>(0);

	useEffect(() => {
		(async () => {
			const quizzes = await fetchQuizzes();
			// 퀴즈 배열 상태 초기화
			setQuizzes(quizzes);
			// 진행중으로 상태 변경
			setStatus(QuizStatus.IN_PROGRESS);
			// 첫 번째 문제부터 시작
			setCurrentIndex(0);
		})();
	}, []);

	// 로딩 중일 때에는 로딩 메시지 출력
	if (status === QuizStatus.LOADING) {
		return <h1>퀴즈를 불러오는 중...</h1>;
	}

	// 모든 문제를 풀었다면 QuizResult 컴포넌트 그려주기
	if (status === QuizStatus.COMPLETED) {
		// 이 시점에는 quizzes의 값이 있다고 확신할 수 있으므로 단언 연산자 사용
		return <QuizResult result={{ score, total: quizzes!.length }} />;
	}

	return (
		<div>
			{status === QuizStatus.IN_PROGRESS && quizzes && (
				<div>
					{/* 퀴즈 진행 상태 출력 */}
					<div>
						{score}/{quizzes.length}
					</div>
					{/* 퀴즈 문제 출력 */}
					<h1>{quizzes[currentIndex].question}</h1>
					<div>
						{
							// 퀴즈의 선택지 출력
							quizzes[currentIndex].choices.map(
								(choice, index) => (
									<>
										<button
											onClick={() => {
												// 정답 선택한 경우에는 점수를 1점 추가
												if (
													quizzes[currentIndex]
														.answer === index
												) {
													setScore(
														(score) => score + 1
													);
												}
												if (
													currentIndex ===
													quizzes.length - 1
												) {
													alert(
														"퀴즈를 모두 풀었습니다."
													);
													// 완료 상태로 변경
													setStatus(
														QuizStatus.COMPLETED
													);
												} else {
													// 인덱스 증가시켜 다음 문제로 넘어가기
													setCurrentIndex(
														currentIndex + 1
													);
												}
											}}
										>
											{index + 1}. {choice}
										</button>
										<br />
									</>
								)
							)
						}
					</div>
				</div>
			)}
		</div>
	);
}
