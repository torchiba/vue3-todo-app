import { defineStore } from 'pinia';

// App.vueから呼び出すために export が必要になった
export type Todo = {
  id: number;
  text: string;
  done: boolean;
}
let id:number = 0;

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [] as Todo[]
    }),
    // methodsに近い(関数の実行)
    actions: {
        // const消す、アロー関数やめる
        addTodo(text: string) {
            if (text.trim() === '') return
            this.todos.push({ id: id++, text: text, done: false })
        },
        removeTodo(id:number) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        }
    },

    // computedに近い(再計算)
    getters: {
        remainingCount: (state) => {
            return state.todos.filter(todo => !todo.done).length;
        }
    }
})