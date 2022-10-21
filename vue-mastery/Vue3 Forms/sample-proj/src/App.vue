<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import FormInput from './components/FormInput.vue';
import { reactive } from 'vue';
import Form from './components/Form.vue';
import * as yup from 'yup';
import YupPassword from 'yup-password';


const credentials = reactive({ 
  username: '', 
  password: ''
});

YupPassword(yup);

const requiredFieldRules = yup.string().required('Required');
const emailFieldRules = requiredFieldRules.email();
const passwordFieldRules = requiredFieldRules.min(8).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1);
</script>

<template>
  
  <Form>
    <FormInput 
      name="email" 
      label="Email" 
      v-model="credentials.username" 
      type="email" 
      :rules="emailFieldRules"
    />
    <FormInput 
      name="password" 
      label="Password" 
      v-model="credentials.password" 
      type="password" 
      :rules="passwordFieldRules"
    />
    <button type="submit" >Submit</button>
  </Form>
</template>

<style scoped>
</style>
