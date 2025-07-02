import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';
import { getAuth } from 'firebase/auth';

function Todos() {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const auth = getAuth();
    const user = auth.currentUser;

    // Only show todos for the current user
    const userTodos = user ? todos.filter(todo => todo.userId === user.uid) : [];

    const getToday = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };
    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const todayStr = getToday();
    const tomorrowStr = getTomorrow();

    const todaysTodos = userTodos.filter(todo => todo.date === todayStr);
    const tomorrowsTodos = userTodos.filter(todo => todo.date === tomorrowStr);
    const otherTodos = userTodos.filter(todo => todo.date !== todayStr && todo.date !== tomorrowStr);

    const renderTodoList = (list) => (
        <ul className="flex flex-row flex-wrap gap-4">
            {list.map((todo) => (
                <li
                    key={todo.id}
                    className="todo-card flex flex-col justify-between min-w-[220px] max-w-[250px] h-[120px] p-4"
                >
                    <div className="flex-1">
                        <div className="text-base text-[#0a357d] font-semibold truncate">{todo.text}</div>
                        <div className="todo-category text-xs mt-1">#{todo.category}</div>
                        <div className="text-xs text-gray-500 mt-1">{todo.date}</div>
                    </div>
                    <div className="todo-actions flex-row gap-2 mt-2 self-end">
                        <button
                            className="todo-action-btn"
                            aria-label="Mark as done"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className="todo-delete-btn"
                            aria-label="Delete note"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="flex flex-row gap-8 justify-center w-full">
            {/* Today */}
            <div className="todo-section flex-1 min-w-0 max-w-[420px]">
                <h2 className="todo-section-title">
                    <span role="img" aria-label="today">📅</span> Today
                </h2>
                <hr className="mb-4 border-[#0a357d]" />
                {renderTodoList(todaysTodos)}
            </div>
            {/* Tomorrow */}
            <div className="todo-section flex-1 min-w-0 max-w-[420px]">
                <h2 className="todo-section-title">
                    <span role="img" aria-label="tomorrow">⏳</span> Tomorrow
                </h2>
                <hr className="mb-4 border-[#0a357d]" />
                {renderTodoList(tomorrowsTodos)}
            </div>
            {/* Other Dates */}
            <div className="todo-section flex-1 min-w-0 max-w-[420px]">
                <h2 className="todo-section-title">
                    <span role="img" aria-label="other">🗓️</span> Other Dates
                </h2>
                <hr className="mb-4 border-[#0a357d]" />
                {renderTodoList(otherTodos)}
            </div>
        </div>
    );
}

export default Todos;
