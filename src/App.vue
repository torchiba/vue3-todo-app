<script setup lang="ts">
import { ref } from 'vue';
// やることをまずコメントに箇条書きで書く
// 入力欄にタスクを入力してエンター押したらタスクとして登録
let id:number = 0;
const newTodo = ref('')
const todos = ref([]) // 配列ではなく、
// 登録したタスクがリスト表示される
// タスク横にボタンがあって、押したらタスクが削除
const addTodo = () => {
  if (newTodo.value.trim() === '') return
  todos.value.push({ id: id++, text: newTodo.value })
  newTodo.value = ""
}
// 配列id番目を消す
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
