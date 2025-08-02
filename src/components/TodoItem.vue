<script setup lang="ts">
import type { Todo } from '@/stores/todo'

// propsの型を明示
const props = defineProps<{
    todo: Todo
}>()

// emitの型定義（イベント名と型）
const emit = defineEmits<{
    (e: 'remove', id: number):void,
    (e: 'done', id: number):void
}>()
</script>

<template>
    <p>
        <input type="checkbox" :id="'todo-' + props.todo.id" name="done" :checked="props.todo.done" @change="emit('done', props.todo.id)"/>
        <label :for="'todo-' + props.todo.id" :class="{ checked: props.todo.done }">{{ props.todo.text }}</label>
        <button @click="emit('remove', props.todo.id)">X</button>
    </p>
</template>

<style scoped>
.checked {
  text-decoration: line-through;
}
</style>
