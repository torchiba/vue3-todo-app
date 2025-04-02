<script setup lang="ts">
import { ref } from 'vue';
let id:number = 0;
const newTodo = ref<string>('')
const todos = ref<Todo[]>([])
type Todo = {
  id: number;
  text: string;
}
const addTodo = () => {
  if (newTodo.value.trim() === '') return
  todos.value.push({ id: id++, text: newTodo.value })
  newTodo.value = ""
}
const removeTodo = (id:number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
</script>

<template>
  <header>
    <div class="wrapper">
      <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodo"/>
        <button>送信</button>
      </form>
    </div>
    <p v-for="todo in todos" :key="todo.id">{{ todo.text }} <button @click="removeTodo(todo.id)">X</button></p>
  </header>

  <main>
  </main>
</template>
