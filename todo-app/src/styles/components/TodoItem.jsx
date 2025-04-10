import styled from "styled-components";

// TodoItem 컨테이너
const TodoItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 10px;
	border-bottom: 1px solid #eee;

	&:hover {
		background-color: #f8f9fa;
	}
`;

// 할 일 제목 텍스트
// props 값을 받아와서 스타일을 다르게 적용하도록 설정
const TodoTitle = styled.span`
	flex: 0.8; // 80% 차지
	cursor: pointer;
	text-decoration: ${(props) => (props.done ? "line-through" : "none")};
	color: ${(props) => (props.done ? "#6c757d" : "#212529")};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

// 삭제 버튼
const DeleteButton = styled.button`
	flex: 0.2; // 20% 차지
	background-color: #e74c3c;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 4px 8px;
	cursor: pointer;
	font-size: 12px;

	&:hover {
		background-color: #c0392b;
	}
`;

export { TodoItemContainer, TodoTitle, DeleteButton };
