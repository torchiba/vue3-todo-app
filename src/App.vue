<script setup lang="ts">
import { ref } from 'vue';
let id:number = 0;
const newTodo = ref<string>('')
const todos = ref<Todo[]>([])
type Todo = {
  id: number;
  text: string;
  done: boolean;
}
const addTodo = () => {
  if (newTodo.value.trim() === '') return
  todos.value.push({ id: id++, text: newTodo.value, done: false })
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
  </header>

  <main>
    <p v-for="todo in todos" :key="todo.id"><input type="checkbox" :id="'todo-' + todo.id" name="done" v-model="todo.done"/><label :for="'todo-' + todo.id" :class="{ checked: todo.done }">{{ todo.text }}</label><button @click="removeTodo(todo.id)">X</button></p>
  </main>
</template>

<style scoped>
.checked {
  text-decoration:line-through;
}
</style>
