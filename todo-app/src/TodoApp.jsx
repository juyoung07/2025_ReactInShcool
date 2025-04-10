import { useRef, useEffect } from "react";
import { v4 } from "uuid";
import TodoList from "./components/TodoList";
import { usePersistentTodoLists } from "./hooks";
import {
	AppContainer,
	AddListButton,
	ListTitleInput,
	ListsContainer,
	TodoListContainer,
} from "./styles";

function TodoApp() {
	const [todoLists, setTodoLists] = usePersistentTodoLists();
	const listTitleInputRef = useRef();

	const removeTodoList = function (listId) {
		setTodoLists((draft) => {
			const index = draft.findIndex((list) => list.id === listId);
			if (index !== -1) {
				draft.splice(index, 1);
			}
		});
	};

	const addTodoToList = function (listId, todo) {
		setTodoLists((draft) => {
			// const index = draft.findIndex((list) => list.id === listId);
			// draft[index].todos.push(todo);
			const list = draft.find((list) => list.id === listId);
			list.todos.push(todo);
		});
	};

	const removeTodoFromTodoList = function (listId, todoId) {
		setTodoLists((draft) => {
			const list = draft.find((list) => list.id === listId);
			if (list) {
				list.todos = list.todos.filter((todo) => todo.id !== todoId);
			}
		});
	};

	const toggleCompletionFromTodoList = function (listId, todoId) {
		setTodoLists((draft) => {
			const list = draft.find((list) => list.id === listId);
			if (list) {
				const todo = list.todos.find((todo) => todo.id === todoId);
				if (todo) {
					todo.done = !todo.done;
				}
			}
		});
	};

	return (
		<AppContainer>
			<h1>Todo List</h1>
			<ListTitleInput
				ref={listTitleInputRef}
				type="text"
				placeholder="새로운 리스트의 제목을 입력하세요."
			/>
			<AddListButton
				onClick={() => {
					const title = listTitleInputRef.current.value;
					if (title.trim().length !== 0) {
						if (todoLists.length >= 4) {
							alert("리스트의 최대 개수는 4개입니다.");
							return; // early return
						}
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
			</AddListButton>
			<ListsContainer>
				{todoLists.map((list) => {
					return (
						<TodoListContainer>
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
						</TodoListContainer>
					);
				})}
			</ListsContainer>
		</AppContainer>
	);
}

export default TodoApp;
