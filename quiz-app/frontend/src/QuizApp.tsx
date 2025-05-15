import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import QuizSolve from "./components/QuizSolve";
import ManageQuiz from "./components/ManageQuiz";
import CreateQuiz from "./components/CreateQuiz";

function QuizAppRoutes() {
	// useLocation 훅은 BrowserRouter 내부에서만 사용 가능하므로, QuizAppRoutes 컴포넌트로 분리하여 코드 작성
	const location = useLocation();

	return (
		<div>
			<header>
				<nav>
					<ul>
						<li>
							<Link to="/">홈 화면</Link>
						</li>
						<li>
							<Link to="/quiz">퀴즈 풀기</Link>
						</li>
						<li>
							<Link to="/manage">퀴즈 관리</Link>
						</li>
					</ul>
				</nav>
			</header>
			<div>
				<Routes>
					<Route path="/" element={<div>홈 화면입니다.</div>} />
					{/* location.key 값을 이용하여 navigate 함수 호출 이후 강제 리마운트가 진행되도록 함 */}
					<Route
						path="/quiz"
						element={<QuizSolve key={location.key} />}
					/>
					<Route path="/manage" element={<ManageQuiz />} />
					<Route path="/create" element={<CreateQuiz />} />
				</Routes>
			</div>
		</div>
	);
}

// QuizApp 컴포넌트의 구조 변경
function QuizApp() {
	return (
		<BrowserRouter>
			<QuizAppRoutes />
		</BrowserRouter>
	);
}

export default QuizApp;
