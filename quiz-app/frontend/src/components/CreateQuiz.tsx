import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 에러 표시 텍스트용 스타일 추가
const errorStyle: React.CSSProperties = {
	color: "red",
	fontSize: "8px",
	margin: "0 4px 0 4px",
};

type Quiz = {
	id: string;
	question: string;
	choices: string[];
	answer: number;
};

// Zod 스키마 정의
// 형식 => z.타입값().제약(제약조건, 에러메시지)
const createQuizFormSchema = z.object({
	question: z.string().min(1, "질문을 입력하세요."), // 최소 1자 이상의 글자는 입력
	choices: z
		.array(z.string().min(1, "선택지 내용을 입력하세요."))
		.min(2, "선택지는 최소 2개 이상이어야 합니다."), // 배열에 요소가 2개 이상이어야 함
	answer: z.number(),
});
// Zod 스키마에서 타입 추출
type CreateQuizFormData = z.infer<typeof createQuizFormSchema>;

const requestQuizCreation = async (
	quizData: CreateQuizFormData
): Promise<Quiz> => {
	try {
		const response = await axios.post<Quiz>("/api/quizzes", quizData);
		return response.data;
	} catch (error) {
		console.error("퀴즈 생성 중 오류 발생:", error);
		throw error;
	}
};

export default function CreateQuiz() {
	// React Hook Form 설정
	const {
		// 입력 필드를 등록하는 함수
		register,
		// 폼 제출 처리 및 유효성 검증 래퍼 함수
		handleSubmit,
		formState: {
			// 각 필드별 유효성 검증 오류 정보가 포함될 객체
			errors,
			// 폼 제출 진행 중 여부를 나타내는 불리언 값 (중복 제출 방지를 위해서 활용)
			isSubmitting,
		},
		// 특정 필드의 값을 변경하는 세터 함수
		setValue,
		// 현재 폼의 값들을 가져오는 함수
		getValues,
		// 전달한 필드 이름을 가진 폼 필드 값의 변화를 관찰하여 최신 값을 돌려주는 함수
		watch,
	} = useForm<CreateQuizFormData>({
		// Zod 스키마로 유효성 검증
		resolver: zodResolver(createQuizFormSchema),
		// 폼 필드의 초기값 설정
		defaultValues: {
			question: "",
			choices: ["", ""],
			answer: 0,
		},
	});
	const navigate = useNavigate();

	// 현재 폼 입력값 관찰을 위해서 watch 함수 사용
	// (watch는 입력값을 실시간으로 관찰하는 함수로, onChange 이벤트 관련 코드 작성을 하지 않게 해 줌)
	const choices = watch("choices");
	const currentAnswer = watch("answer");

	// 선택지 추가 핸들러
	const addChoice = () => {
		const currentChoices = getValues("choices");
		setValue("choices", [...currentChoices, ""]);
	};

	// 선택지 삭제 핸들러
	const removeChoice = (index: number) => {
		const currentChoices = getValues("choices");
		if (currentChoices.length <= 2) {
			alert("선택지는 최소 2개 이상이어야 합니다.");
			return;
		}
		// 현재 정답이 삭제하려는 선택지인 경우 정답을 0번으로 변경
		if (currentAnswer === index) {
			setValue("answer", 0);
		}
		// 삭제하려는 선택지 이후의 정답인 경우 인덱스 조정
		else if (currentAnswer > index) {
			setValue("answer", currentAnswer - 1);
		}
		setValue(
			"choices",
			currentChoices.filter((_, i) => i !== index)
		);
	};
	// 폼 제출 핸들러
	const onSubmit = async (data: CreateQuizFormData) => {
		// 로직은 이전과 동일
		try {
			await requestQuizCreation(data);
			navigate("/manage");
		} catch (error) {
			console.error("퀴즈 생성 중 오류 발생:", error);
			alert("퀴즈 생성에 실패했습니다.");
		}
	};

	return (
		<div>
			<h1>퀴즈 생성</h1>
			{/* 
            handleSubmit이 onSubmit 함수를 감싸서 폼 제출 전 유효성 검사를 수행하도록 함
            (즉, 폼을 제출하면 먼저 유효성 검증부터 진행하고 이상이 없는 경우 onSubmit이 실행됨)
        */}
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* register 함수로 defaultValues로 전달한 속성 이름을 전달하며 동시에 input 필드를 등록하면, 값 추적 및 유효성 검사가 진행되도록 함 */}
				<input
					type="text"
					placeholder="질문을 입력하세요."
					{...register("question")}
				/>
				{/* question 필드에 대한 오류가 있으면 오류 메시지를 표시 */}
				{errors.question && (
					<span style={errorStyle}>{errors.question.message}</span>
				)}
				<br />
				<ul>
					{choices.map((choice, index) => (
						<li key={index}>
							{/* 동적 필드명(choices.0, choices.1 등)으로 각 선택지 등록 */}
							<input
								type="text"
								placeholder={`선택지 ${index + 1}`}
								{...register(`choices.${index}`)}
							/>
							{/* 개별 선택지의 오류 메시지 표시 */}
							{errors.choices?.[index] && (
								<span style={errorStyle}>
									{errors.choices[index]?.message}
								</span>
							)}
							<button
								type="button"
								style={
									index === currentAnswer
										? { background: "green" }
										: {}
								}
								onClick={() => setValue("answer", index)}
							>
								답으로 설정
							</button>
							<button
								type="button"
								onClick={() => removeChoice(index)}
							>
								선택지 삭제
							</button>
						</li>
					))}
				</ul>
				{/* choices 배열 자체에 대한 오류 메시지("최소 2개 이상 등록" 등) 표시 */}
				{errors.choices &&
					typeof errors.choices.message === "string" && (
						<span style={errorStyle}>{errors.choices.message}</span>
					)}
				{/* 선택지 추가 버튼에 앞서 정의한 핸들러 연결 */}
				<input type="button" value="선택지 추가" onClick={addChoice} />
				<br />
				{/* isSubmitting 값을 검사하여, 제출 중이면 텍스트 변경 및 버튼을 비활성화 하도록 설정 */}
				<input
					type="submit"
					value={isSubmitting ? "생성 중..." : "퀴즈 생성"}
					disabled={isSubmitting}
				/>
			</form>
		</div>
	);
}
