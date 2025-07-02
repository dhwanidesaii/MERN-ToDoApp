import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import { getAuth } from 'firebase/auth';

function AddTodo() {
    const [input, setInput] = useState('');
    const [category, setCategory] = useState('General');
    const [date, setDate] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const auth = getAuth();
    const user = auth.currentUser;

    const getToday = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };
    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const handleMenuSelect = (option) => {
        if (option === 'today') {
            setDate(getToday());
            handleAddTodo(getToday());
        } else if (option === 'tomorrow') {
            setDate(getTomorrow());
            handleAddTodo(getTomorrow());
        } else if (option === 'custom') {
            setDate('');
        }
        setShowMenu(false);
    };

    const handleCustomDate = (e) => {
        setDate(e.target.value);
    };

    const handleAddTodo = (selectedDate) => {
        if (!input.trim() || !selectedDate || !user) return;
        dispatch(addTodo({ text: input.trim(), category, date: selectedDate, userId: user.uid }));
        setInput('');
        setCategory('General');
        setDate('');
    };

    const addTodoHandler = (e) => {
        e.preventDefault();
        setShowMenu(true);
    };

    return (
        <>
            <form onSubmit={addTodoHandler} className="todo-form">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="What's your task?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    aria-label="Todo Input"
                />
                <select
                    className="todo-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    aria-label="Category Select"
                >
                    <option value="General">General</option>
                    <option value="Study">Study</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="todo-btn"
                >
                    Add Task
                </button>
            </form>
            {showMenu && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 min-w-[300px]">
                        <h3 className="text-lg font-semibold mb-2">Select Date for Task</h3>
                        <button className="todo-btn" onClick={() => handleMenuSelect('today')}>Today</button>
                        <button className="todo-btn" onClick={() => handleMenuSelect('tomorrow')}>Tomorrow</button>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="custom-date" className="text-sm font-medium">Pick a date:</label>
                            <input
                                id="custom-date"
                                type="date"
                                className="todo-input"
                                value={date}
                                onChange={handleCustomDate}
                            />
                            <button
                                className="todo-btn mt-2"
                                onClick={() => {
                                    if (date) handleAddTodo(date);
                                    setShowMenu(false);
                                }}
                                disabled={!date}
                            >
                                Add with Selected Date
                            </button>
                        </div>
                        <button className="clear-btn mt-2" onClick={() => setShowMenu(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddTodo;
