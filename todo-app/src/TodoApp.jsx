import { useState, useRef } from "react";
import { v4 } from "uuid";

function TodoItem({
	listId,
	id,
	title,
	done,
	removeFromTodoList,
	toggleCompletionFromTodoList,
}) {
	return (
		<div>
			<span
				style={done ? { textDecoration: "line-through" } : {}}
				onClick={() => {
					toggleCompletionFromTodoList(listId, id);
				}}
			>
				{title}
			</span>
			<button
				onClick={() => {
					removeFromTodoList(listId, id);
				}}
			>
				삭제
			</button>
		</div>
	);
}

function TodoList({
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
					return { ...list, todos: [...list.todos, todo] }; // 리렌더링을 하기 위해
				}
				return list;
			})
		);
	};

	const removeTodoFromTodoList = function (listId, todoId) {
		setTodoLists((prev) =>
			prev.map((list) => {
				if (list.id === listId) {
					return {
						...list,
						todos: list.todos.filter((todo) => todo.id !== todoId),
					};
				}
				return list;
			})
		);
	};

	const toggleCompletionFromTodoList = function (listId, todoId) {
		setTodoLists((prev) => {
			return prev.map((list) => {
				if (list.id === listId) {
					return {
						...list,
						todos: list.todos.map((todo) => {
							if (todo.id === todoId) {
								return {
									...todo,
									done: !todo.done,
								};
							}
						}),
					};
				}
			});
		});
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
							removeFromTodoList={removeTodoFromTodoList}
							toggleCompletionFromTodoList={
								toggleCompletionFromTodoList
							}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default TodoApp;
