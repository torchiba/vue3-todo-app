<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo';
import TodoItem from './components/TodoItem.vue';

const store = useTodoStore();
const newTodo = ref('')

const addNewTodo = () => {
  store.addTodo(newTodo.value)
  newTodo.value = ''
}
const removeTodo = (id: number) => {
  store.removeTodo(id)
}
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
    <p>合計：{{store.todos.length}}件 ｜ 未完了: {{ store.remainingCount }}件</p>
    <TodoItem
      v-for="todo in store.todos"
      :key="todo.id"
      :todo="todo"
      @remove="removeTodo"
    />
  </main>
</template>

