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
    <li class="flex items-center gap-2 p-3 bg-white rounded shadow">
        <label class="flex items-center gap-2 flex-1 cursor-pointer select-none">
            <input
            type="checkbox"
            :checked="props.todo.done"
            @change="emit('done', props.todo.id)"
            class="peer w-5 h-5"
            />
            <span class="peer-checked:line-through peer-checked:text-gray-400">
            {{ props.todo.text }}
            </span>
        </label>
        <button
            @click="emit('remove', props.todo.id)"
            class="py-1 px-5 bg-gray-500 rounded-2xl text-white ml-auto"
        >
            X
        </button>
    </li>
</template>

<style scoped>
.checked {
  text-decoration: line-through;
}
</style>
