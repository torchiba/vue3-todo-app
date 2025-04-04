<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
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
  state.todos = state.todos.filter(todo => todo.id !== id)
}
const remainingCount = computed(() => {
  return state.todos.filter(todo => !todo.done).length;
})
watch(
  () => state.todos.length,
  (newValue, oldValue) => {
    console.log(`value Change!: ${oldValue} -> ${newValue}`)
  }
)
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
    <p>合計：{{state.todos.length}}件 ｜ 未完了: {{ remainingCount }}件</p>
    <p v-for="todo in state.todos" :key="todo.id"><input type="checkbox" :id="'todo-' + todo.id" name="done" v-model="todo.done"/><label :for="'todo-' + todo.id" :class="{ checked: todo.done }">{{ todo.text }}</label><button @click="removeTodo(todo.id)">X</button></p>
  </main>
</template>

<style scoped>
.checked {
  text-decoration:line-through;
}
</style>
