import { defineStore } from 'pinia';

// すべて｜完了｜未完了
export type FilterStatus = 'all' | 'done' | 'undone'

export const useFilterStore = defineStore('filter', {
    state: () => ({
        filterStatus: 'all' as FilterStatus
    }),
    actions: {
        setFilter(status: FilterStatus) {
            this.filterStatus = status;
        }
    }
})