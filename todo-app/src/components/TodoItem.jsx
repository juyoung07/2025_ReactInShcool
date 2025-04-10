import {
	TodoItemContainer,
	TodoTitle,
	DeleteButton,
} from "../styles/components/TodoItem";

export default function TodoItem({
	listId,
	id,
	title,
	done,
	removeFromTodoList,
	toggleCompletionFromTodoList,
}) {
	return (
		<TodoItemContainer>
			<TodoTitle
				style={done ? { textDecoration: "line-through" } : {}}
				onClick={() => {
					toggleCompletionFromTodoList(listId, id);
				}}
			>
				{title}
			</TodoTitle>
			<DeleteButton
				onClick={() => {
					removeFromTodoList(listId, id);
				}}
			>
				삭제
			</DeleteButton>
		</TodoItemContainer>
	);
}
