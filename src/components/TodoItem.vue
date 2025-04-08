<script setup lang="ts">
import type { Todo } from '@/stores/todo'

// propsの型を明示
const props = defineProps<{
    todo: Todo
}>()

// emitの型定義（イベント名と型）
const emit = defineEmits<{
    (e: 'remove', id: number):void
}>()
</script>

<template>
    <p>
        <input type="checkbox" :id="'todo-' + props.todo.id" name="done" v-model="props.todo.done"/>
        <label :for="'todo-' + props.todo.id" :class="{ checked: props.todo.done }">{{ props.todo.text }}</label>
        <button @click="emit('remove', props.todo.id)">X</button>
    </p>
</template>

<style scoped>
.checked {
  text-decoration: line-through;
}
</style>
