<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo';

const store = useTodoStore();
const newTodo = ref('')

const addNewTodo = () => {
  store.addTodo(newTodo.value)
  newTodo.value = ''
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
    <p v-for="todo in store.todos" :key="todo.id"><input type="checkbox" :id="'todo-' + todo.id" name="done" v-model="todo.done"/><label :for="'todo-' + todo.id" :class="{ checked: todo.done }">{{ todo.text }}</label><button @click="store.removeTodo(todo.id)">X</button></p>
  </main>
</template>

<style scoped>
.checked {
  text-decoration:line-through;
}
</style>
