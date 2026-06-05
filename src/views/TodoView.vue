<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useTodoStore } from '../stores/todo-store'

const todoStore = useTodoStore()
const title = ref('')
const activeTab = ref<'all' | 'active' | 'done'>('all')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  if (!title.value.trim()) return
  todoStore.addTodo(title.value)
  title.value = ''
}

const visibleTodos = computed(() => {
  if (activeTab.value === 'active') return todoStore.todos.filter(t => !t.is_done)
  if (activeTab.value === 'done') return todoStore.todos.filter(t => t.is_done)
  return todoStore.todos
})

const activeTodosCount = computed(() => todoStore.todos.filter(t => !t.is_done).length)
const doneTodosCount = computed(() => todoStore.todos.filter(t => t.is_done).length)

function clearDone() {
  todoStore.todos
    .filter(t => t.is_done)
    .forEach(t => todoStore.deleteTodo(t.id))
}
</script>

<template>
  <div class="app">
    <!-- Header -->
    <div class="header">
      <h1>My todos</h1>
      <p>Stay on top of your tasks</p>
    </div>

    <!-- Loading / Error -->
    <p v-if="todoStore.loading" class="status">Loading...</p>
    <p v-if="todoStore.error" class="status error">{{ todoStore.error }}</p>

    <!-- Add row -->
    <div class="add-row">
      <input
        v-model="title"
        type="text"
        placeholder="Add a new task..."
        @keyup.enter="onAdd"
      />
      <button @click="onAdd">+ Add</button>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: activeTab === 'all' }"
        @click="activeTab = 'all'"
      >
        All <span class="badge">{{ todoStore.todos.length }}</span>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'active' }"
        @click="activeTab = 'active'"
      >
        Active <span class="badge">{{ activeTodosCount }}</span>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'done' }"
        @click="activeTab = 'done'"
      >
        Done <span class="badge">{{ doneTodosCount }}</span>
      </button>
    </div>

    <!-- Todo list -->
    <div class="todo-list">
      <div v-if="visibleTodos.length === 0" class="empty">
        Nothing here
      </div>

      <div
        v-for="todo in visibleTodos"
        :key="todo.id"
        class="todo-card"
        :class="{ done: todo.is_done }"
      >
        <div
          class="checkbox"
          :class="{ checked: todo.is_done }"
          @click="todoStore.toggleTodo(todo)"
        />
        <span class="todo-text">{{ todo.title }}</span>
        <button class="delete-btn" @click="todoStore.deleteTodo(todo.id)">🗑</button>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <span>{{ activeTodosCount }} task{{ activeTodosCount !== 1 ? 's' : '' }} remaining</span>
      <button @click="clearDone">Clear done</button>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 520px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: sans-serif;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 22px;
  font-weight: 500;
  margin: 0;
}

.header p {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

.status {
  font-size: 14px;
  color: #888;
  margin-bottom: 1rem;
}

.status.error {
  color: #e24b4a;
}

.add-row {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.add-row input {
  flex: 1;
  padding: 8px 12px;
  border: 0.5px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
}

.add-row input:focus {
  border-color: #888;
}

.add-row button {
  padding: 8px 16px;
  border: 0.5px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.add-row button:hover {
  background: #f5f5f5;
}

.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 1rem;
}

.tab {
  font-size: 13px;
  padding: 5px 14px;
  border-radius: 8px;
  border: 0.5px solid transparent;
  color: #888;
  cursor: pointer;
  background: transparent;
}

.tab.active {
  background: #f5f5f5;
  border-color: #ddd;
  color: #111;
  font-weight: 500;
}

.badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 99px;
  background: #eee;
  color: #666;
  margin-left: 4px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty {
  text-align: center;
  padding: 3rem 0;
  color: #aaa;
  font-size: 14px;
}

.todo-card {
  background: white;
  border: 0.5px solid #eee;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.15s;
}

.todo-card:hover {
  border-color: #ccc;
}

.todo-card.done {
  opacity: 0.6;
}

.checkbox {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
}

.checkbox.checked {
  background: #1d9e75;
  border-color: #1d9e75;
}

.todo-text {
  flex: 1;
  font-size: 15px;
}

.todo-card.done .todo-text {
  text-decoration: line-through;
  color: #aaa;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #aaa;
  padding: 4px;
  border-radius: 6px;
}

.delete-btn:hover {
  color: #e24b4a;
}

.footer {
  margin-top: 1.5rem;
  font-size: 13px;
  color: #888;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer button {
  font-size: 13px;
  padding: 4px 10px;
  border: 0.5px solid #ddd;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.footer button:hover {
  background: #f5f5f5;
}
</style>