import { useEffect } from 'react'
import { useImmer } from 'use-immer'

// useEffect 등 근본 훅이 들어가야 커스텀 훅이라 할 수 있음
export function usePersistentTodoLists() {
    const [todoLists, setTodoLists] = useImmer(() => {
        const savedLists = localStorage.getItem('todoLists')
        return savedLists ? JSON.parse(savedLists) : []
    });

    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(todoLists))
    }, [todoLists])

    return [todoLists, setTodoLists]
}