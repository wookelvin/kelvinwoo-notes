<script setup lang="ts">
import TodoList from "./TodoList.vue";
import TodoForm from "./TodoForm.vue";
</script>

<template>
    <div class="todo-app">
    <h1>To Do List</h1>
    <TodoForm />
    <TodoList />
    </div>
</template>

<style scoped>
.todo-app{ 
    width:300px;
    margin: 0 auto;
}
</style>
