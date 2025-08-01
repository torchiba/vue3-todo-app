<script setup lang="ts">
import { ref,computed } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { useFilterStore } from '@/stores/filter';
import TodoItem from './components/TodoItem.vue';

const todoStore = useTodoStore();
const filterStore = useFilterStore();
const newTodo = ref('')

const addNewTodo = () => {
  todoStore.addTodo(newTodo.value)
  newTodo.value = ''
}
const removeTodo = (id: number) => {
  todoStore.removeTodo(id)
}

const filteredTodos = computed(() => {
  if (filterStore.filterStatus === 'all') return todoStore.todos;
  if (filterStore.filterStatus === 'done') return todoStore.todos.filter(t => t.done);
  if (filterStore.filterStatus === 'undone') return todoStore.todos.filter(t => !t.done);
});
</script>

<template>
  <header>
    <div class="wrapper">
      <form @submit.prevent="addNewTodo">
        <input type="text" v-model="newTodo"/>
        <button>送信</button>
      </form>
    </div>
  </header>

  <main>
    <p>合計：{{todoStore.todos.length}}件 ｜ 未完了: {{ todoStore.remainingCount }}件 filterStore.filterStatus: {{ filterStore.filterStatus }}</p>
    <div>
      <button @click="filterStore.setFilter('all')">すべて表示</button>
      <button @click="filterStore.setFilter('done')">完了</button>
      <button @click="filterStore.setFilter('undone')">未完了</button>
    </div>
    <TodoItem
      v-if="todoStore.todos.length !== 0"
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @remove="removeTodo"
    />
    <p v-else>タスクがありません</p>
  </main>
</template>

