// 공통적으로 쓸 스타일들
import styled from 'styled-components'

const AppContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
`

const ListsContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`

const TodoListContainer = styled.div`
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
    background-color: #f9f9f9;
`

const ListTitleInput = styled.input`
    width: 100%;
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 32px;

    &:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
    }
`

const AddListButton = styled.button`
    width: 100%;
    height: 50px;
    color: white;
    background: gray;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        opacity: 0.9;
    }
`

export { AppContainer, ListsContainer, TodoListContainer, ListTitleInput, AddListButton }