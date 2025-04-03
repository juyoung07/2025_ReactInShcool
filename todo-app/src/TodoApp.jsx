import { useState, useRef } from "react";
import { v4 } from "uuid";

function TodoList({ id, title, todos, removeTodoList, addTodoToList }) {
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
					<h2>{todo.title}</h2>
				))}
			</div>
		</div>
	);
}

function TodoApp() {
	const [todoLists, setTodoLists] = useState([]);
	const listTitleInputRef = useRef();

	const removeTodoList = function (listId) {
		setTodoLists((prev) => prev.filter((list) => list.id !== listId));
	};

	const addTodoToList = function (listId, todo) {
		setTodoLists((prev) =>
			prev.map((list) => {
				if (list.id === listId) {
					return { ...list, todos: [...list.todos, todo] };
				}
				return list;
			})
		);
	};

	return (
		<div>
			<h1>Todo List</h1>
			<input
				ref={listTitleInputRef}
				type="text"
				placeholder="새로운 리스트의 제목을 입력하세요."
			/>
			<button
				onClick={() => {
					const title = listTitleInputRef.current.value;
					if (title.trim().length !== 0) {
						setTodoLists((prev) => [
							...prev,
							{
								id: v4(),
								title,
								todos: [],
							},
						]);
						listTitleInputRef.current.value = "";
					} else {
						alert("리스트의 제목을 입력하세요.");
					}
				}}
			>
				리스트 추가
			</button>
			<div>
				{todoLists.map((list) => {
					return (
						<TodoList
							key={list.id}
							{...list}
							removeTodoList={removeTodoList}
							addTodoToList={addTodoToList}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default TodoApp;
