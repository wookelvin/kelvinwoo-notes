<script setup lang="ts">

import { useTodoStore } from '@/stores/TodoStore';
import { ref } from 'vue';
const store = useTodoStore();

const newItem = ref('');

function onSubmit(){ 
    store.addTodo(newItem.value);
    newItem.value = '';
}
</script>

<template>
    <form @submit.stop.prevent="onSubmit()">
        <input type="text" v-model="newItem" required/>
        <button type="submit">Add</button>
    </form>
</template>

<style scoped>
form{ 
    margin-bottom: 1em;
    display:flex;
}
input{ 
    flex: 1;
    margin-right:1em;
}
</style>
