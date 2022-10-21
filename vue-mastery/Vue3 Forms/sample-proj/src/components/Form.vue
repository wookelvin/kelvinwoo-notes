<script setup lang="ts">
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import Alert from './Alert.vue';


const { handleSubmit } = useForm(); // use directly for non ajax submits
const errorsOnForm = ref(false);
const alert = ref<typeof Alert>();

function onInvalidSubmit(data: { values: any, errors: any, results: any}){ 
    console.log('values', data.values);
    console.log('errors', data.errors);
    console.log('results', data.results);
    errorsOnForm.value = true;
    alert.value?.toggleShake();
}

const onSubmit = handleSubmit( values => { 
    errorsOnForm.value = false;
    console.log('values', values, null, 2);
}, onInvalidSubmit);

</script>

<template>
    <form @submit="onSubmit" novalidate>
        <Alert v-if="errorsOnForm" ref="alert">
            There were some errors with your form submission
        </Alert>
        <slot></slot>
    </form>
</template>

<style scoped>
.form-error{ 
    background:red;
    color:white;
    padding: 0.5em 1em;
    font-size: small;
    margin-bottom: 0.5em;
}
</style>
