import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type Quiz = {
	id: string;
	question: string;
	choices: string[];
	answer: number;
};

type CreateQuizCreation = Omit<Quiz, "id">;

const requestQuizCreation = async (quizData: CreateQuizCreation) => {
	try {
		const response = await axios.post<Quiz>("/api/quizzes", quizData);
		return response.data;
	} catch (err) {
		console.error("퀴즈 생성 중 오류 발생: ", err);
		throw err;
	}
};

export default function CreateQuiz() {
	const [quizFormData, setQuizFormData] = useState<CreateQuizCreation>({
		question: "",
		choices: ["", ""],
		answer: 0,
	});
	const navigate = useNavigate();

	const handleQuizCreation = async function (e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (quizFormData.question.trim() === "") {
			alert("질문을 입력하세요.");
			return;
		}
		if (quizFormData.choices.some((choice) => choice.trim() === "")) {
			alert("선택지를 입력하세요.");
			return;
		}

		try {
			await requestQuizCreation(quizFormData);
			navigate("/manage");
		} catch (err) {
			console.error("퀴즈 생성 중 오류 발생: ", err);
			alert("퀴즈 생성에 실패했습니다.");
		}
	};

	return (
		<div>
			<h1>퀴즈 생성</h1>
			<form onSubmit={handleQuizCreation}>
				<input
					type="text"
					placeholder="질문을 입력해주세요."
					value={quizFormData.question}
					onChange={(e) =>
						setQuizFormData({
							...quizFormData,
							question: e.target.value,
						})
					}
				/>
				<br />
				<ul>
					{quizFormData.choices.map((choice, index) => {
						return (
							<li key={index}>
								<input
									type="text"
									placeholder={`선택지 ${index + 1}`}
									value={choice}
									onChange={(e) => {
										const newChoices = [
											...quizFormData.choices,
										];
										newChoices[index] = e.target.value;
										setQuizFormData({
											...quizFormData,
											choices: newChoices,
										});
									}}
								/>
								{/* 해당 선택지를 답으로 설정 */}
								<button
									type="button"
									style={
										index === quizFormData.answer
											? { backgroundColor: "green" }
											: {}
									}
									onClick={() => {
										setQuizFormData({
											...quizFormData,
											answer: index,
										});
									}}
								>
									답으로 설정
								</button>

								{/* 선택지 삭제 버튼 (단, 2개 이상은 삭제 불가) */}
								<button
									type="button"
									onClick={() => {
										if (quizFormData.choices.length <= 2) {
											alert(
												"선택지는 최소 2개 이상이어야 합니다."
											);
											return;
										}
										setQuizFormData({
											...quizFormData,
											choices:
												quizFormData.choices.filter(
													(_, i) => i !== index
												),
										});
									}}
								>
									선택지 삭제
								</button>
							</li>
						);
					})}
				</ul>
				<input
					type="button"
					value="선택지 추가"
					onClick={() =>
						setQuizFormData({
							...quizFormData,
							choices: [...quizFormData.choices, ""],
						})
					}
				/>
				<br />
				<input type="submit" value="퀴즈 생성" />
			</form>
		</div>
	);
}
