<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { string } from 'yup';


const props = withDefaults(
    defineProps<{
        variant: string
    }>(),  
    { 
        variant: 'danger', 
    }
);

const alert = ref<HTMLElement>();

async function toggleShake(){ 
    alert.value?.classList.remove('shake');
    setTimeout(() => { 
        alert.value?.classList.add('shake');
    }, 50);
    
}

defineExpose({ 
    toggleShake
})


</script>

<template>

    <div class="alert shake" ref="alert">
        <slot />
    </div>
</template>

<style scoped>
.alert { 
    width: 100%;
    display:block;
    background: red;
    color:white;

    padding: 0.25em 0.5em;
    border-radius: 0.1em;
    margin-bottom:1em;
}

</style>
