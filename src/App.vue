<script setup lang="ts">
import { reactive, ref } from 'vue';
let id:number = 0;
const state = reactive({
  newTodo: '' as string,
  todos: [] as Todo[]
})
type Todo = {
  id: number;
  text: string;
  done: boolean;
}

const addTodo = () => {
  if (state.newTodo.trim() === '') return
  state.todos.push({ id: id++, text: state.newTodo, done: false })
  state.newTodo = ""
}
const removeTodo = (id:number) => {
  state.todos = state.todos.filter((todo) => todo.id !== id)
}
</script>

<template>
  <header>
    <div class="wrapper">
      <form @submit.prevent="addTodo">
        <input type="text" v-model="state.newTodo"/>
        <button>送信</button>
      </form>
    </div>
  </header>

  <main>
    <p v-for="todo in state.todos" :key="todo.id"><input type="checkbox" :id="'todo-' + todo.id" name="done" v-model="todo.done"/><label :for="'todo-' + todo.id" :class="{ checked: todo.done }">{{ todo.text }}</label><button @click="removeTodo(todo.id)">X</button></p>
  </main>
</template>

<style scoped>
.checked {
  text-decoration:line-through;
}
</style>
