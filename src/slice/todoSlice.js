import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'All',
    sort: 'Recent',
  },
  reducers: {
    setTodos(state, action) {
      state.items = action.payload.map(todo => ({
        ...todo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    },
    addTodo(state, action) {
      const newId = state.items.length ? state.items.length + 1 : 1;

      state.items.unshift({
        id: newId,
        title: action.payload,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    },
    deleteTodo(state, action) {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updated_at = new Date().toISOString();
      }
    },
    editTodo(state, action) {
      const { id, newTitle } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        todo.title = newTitle;
        todo.updated_at = new Date().toISOString();
      }
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  setFilter,
  setSort,
} = todoSlice.actions;

export default todoSlice.reducer;