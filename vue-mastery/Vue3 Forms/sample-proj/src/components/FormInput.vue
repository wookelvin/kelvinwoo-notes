<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';
import { uniqueId } from 'lodash';
import { AnyObject } from 'yup/lib/types';


const props = withDefaults(defineProps<{
    name: string;
    label: string;
    type?: string;
    modelValue?: string;
    required?: boolean;
    id?: string;
    rules?:  any;
    customValidation?: ((value: string) => string | 'true');
}>(), { 
    type: 'text', 
    modelValue: '',
    required: false,
    id: () => uniqueId('form-input-')
});

const nameRef = toRef(props, 'name');

const {value, errorMessage} = useField(nameRef, 
    props.customValidation ?? 
    props.rules
)

</script>

<template>
    <div class="form-input">
        <label :for="id">{{label}} <span v-if="required">(Required)</span></label>
        <input :type="type" v-model="value" />
        <div class="errorMessage" >
            {{ errorMessage }}
        </div>
    </div>
</template>

<style scoped>
input, label{ 
    display:block;
    width: 100%;   
}
input{ 
    padding: 0.5em;
    border-radius: 0.5em;
    border: 1px solid #eee;
}

.form-input{ 
    margin-bottom: 0.5em;
    text-align: left;
}
label{ 
    font-size: -0.5;
}
.errorMessage{ 
    font-size: small;
    color:red;
}
</style>
