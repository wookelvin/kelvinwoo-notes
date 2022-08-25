<script setup lang="ts">
import { useTodoStore } from '@/stores/TodoStore';
import { storeToRefs } from 'pinia';
const store = useTodoStore();
const { items } = storeToRefs(store); //ensures it stays reactive
</script>

<template>
    <div>
        <div v-for="item of items" :key="item.id" :class="{completed: item.completed}" class="todo-item">
            <div class="todo-item-label">{{item.label}}</div>
            <div>
                <button type="button" @click="store.toggleTodoComplete(item.id)">✔️</button>
                <button type="button" @click="store.deleteTodo(item.id)">🗑️</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
button{ 
    margin-left: 0.25em;
}
.todo-item{ 
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom: 0.25em;
}
.todo-item.completed .todo-item-label{ 
    text-decoration: line-through;
}
</style>
