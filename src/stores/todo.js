import { defineStore } from "pinia";
import axios from 'axios';

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
actions: {
  async fetchTodos() {
    try {
      const response = await axios.get('/api/tasks');
      this.todos = response.data; 
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  },
  async toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        const isDone = this.todos[foundIndex].completedAt != null;
        const endpoint = isDone ? `/api/tasks/${id}/pending` : `/api/tasks/${id}/done`;
        const completedAt = isDone ? null : new Date().toISOString();
        try {
          await axios.patch(endpoint, { completedAt });
          this.todos[foundIndex].completedAt = completedAt;
        } catch (error) {
          console.error('Failed to toggle status:', error);
        }
      }
    },
    async addTodo(todo) {
      try {
        const response = await axios.post('/api/tasks', {
          name: todo,
          description: 'description',
        });
        this.todos.push(response.data);
        this.todos = JSON.parse(JSON.stringify(this.todos));
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    },
    async clearAll() {
      try {
        await axios.delete('/api/tasks');
        this.todos = [];
      } catch (error) {
        console.error('Failed to clear todos:', error);
      }
    },
  },
});
