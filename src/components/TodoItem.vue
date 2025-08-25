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
    <li class="flex gap-x-3 items-center gap-2 p-3 bg-white rounded shadow">
        <label class="flex items-center gap-2 flex-1 cursor-pointer select-none">
            <input
            type="checkbox"
            :checked="props.todo.done"
            @change="emit('done', props.todo.id)"
            class="peer w-5 h-5 hidden"
            />
            <span class="size-5 flex justify-center items-center rounded-full border border-gray-400 peer-checked:bg-blue-600 text-white peer-checked:dark:bg-blue-500 peer-checked:border-blue-500">
                <svg class="shrink-0 size-3.5 peer-checked:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </span>
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
