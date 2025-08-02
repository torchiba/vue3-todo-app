import { defineStore } from 'pinia';

// すべて｜完了｜未完了
export type FilterStatus = 'all' | 'done' | 'undone'

export const useFilterStore = defineStore('filter', {
    state: () => ({
        filterStatus: 'all' as FilterStatus
    }),
    actions: {
        loadFilter() {
            const data = localStorage.getItem('filter')
            if (data) {
                this.filterStatus = JSON.parse(data)
            }
        },
        setFilter(status: FilterStatus) {
            this.filterStatus = status;
            this.saveToStorage()
        },
        saveToStorage() {
            localStorage.setItem('filter', JSON.stringify(this.filterStatus))
            console.log(JSON.stringify(this.filterStatus))
        }
    }
})