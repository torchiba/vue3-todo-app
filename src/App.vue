<script setup lang="ts">
import { ref,computed,onMounted } from 'vue';
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
const doneTodo = (id: number) => {
  console.log("doneTodo")
  todoStore.toggleDone(id);
  todoStore.saveToStorage();
}
// localStorageクリア
const clearStorage = () => {
  localStorage.clear()
}
const filters = [
  {key: 'all', label: 'すべて表示'},
  {key: 'done', label: '完了'},
  {key: 'undone', label: '未完了'}
]
const isActive = (k:string) => filterStore.filterStatus === k

const filteredTodos = computed(() => {
  if (filterStore.filterStatus === 'all') return todoStore.todos;
  if (filterStore.filterStatus === 'done') return todoStore.todos.filter(t => t.done);
  if (filterStore.filterStatus === 'undone') return todoStore.todos.filter(t => !t.done);
});

onMounted(() => {
  todoStore.loadTodos()
  filterStore.loadFilter()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 text-gray-800 flex flex-col gap-8 items-stretch">
    <header class="w-7/12 mx-auto">
      <div class="wrapper">
        <form @submit.prevent="addNewTodo" class="flex gap-4">
          <input type="text" v-model="newTodo" class="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">送信</button>
        </form>
      </div>
    </header>

    <main class="flex flex-col gap-2 w-7/12 mx-auto">
      <p>合計：{{todoStore.todos.length}}件 ｜ 未完了: {{ todoStore.remainingCount }}件</p>
      <div class="flex">
        <button
          v-for="f in filters" :key="f.key"
          @click="filterStore.setFilter(f.key)"
          class="px-4 py-2 rounded order transition-colors border"
          :class="isActive(f.key)
            ? 'bg-blue-500 border-blue-500 text-white'
            : 'border-neutral-300 bg-transparent transition-colors hover:bg-neutral-200'
          ">
            {{ f.label }}
        </button>

        <button @click="clearStorage()" class="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600 ml-auto">filterStore全部消す</button>
      </div>
      <ul class="space-y-2">
        <TodoItem
          v-if="todoStore.todos.length !== 0"
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @remove="removeTodo"
          @done="doneTodo"
        />
        <li v-else>タスクがありません</li>
      </ul>
    </main>
  </div>
</template>
