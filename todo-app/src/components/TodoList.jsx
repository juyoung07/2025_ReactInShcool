import { useState } from "react";
import TodoItem from "./TodoItem";
import { v4 } from "uuid";

export default function TodoList({
	id,
	title,
	todos,
	removeTodoList,
	addTodoToList,
	toggleCompletionFromTodoList,
	removeFromTodoList,
}) {
	// 제어 컴포넌트와 비제어 컴포넌트의 개념
	const [todoTitle, setTodoTitle] = useState("");

	return (
		<div>
			<h2>{title}</h2>
			<input
				value={todoTitle}
				onChange={(e) => setTodoTitle(e.target.value)} // target은 input.. 제어 컴포넌트를 만들엇다!
				type="text"
				placeholder="할 일을 입력하세요."
			/>
			<button
				onClick={() => {
					addTodoToList(id, {
						id: v4(),
						title: todoTitle,
						done: false,
					});
					setTodoTitle("");
				}}
			>
				할 일 추가
			</button>
			<hr style={{ color: "grey" }} />
			<button onClick={() => removeTodoList(id)}>리스트 삭제</button>
			<div>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						listId={id}
						{...todo}
						removeFromTodoList={removeFromTodoList}
						toggleCompletionFromTodoList={
							toggleCompletionFromTodoList
						}
					/>
				))}
			</div>
		</div>
	);
}
