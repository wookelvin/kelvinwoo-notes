# Introduction to the Script Setup Syntax
# Reactive Variables with Type inference


```vue
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

interface AppInfo { 
    name: string;
    slogan: string;
}

const count = ref<number | null>(null) // inferred type
const appInfo: AppInfo = reactive({ 
    name: 'Counter', 
    slogan: 'an app you can count on'
})

onMounted(() => { 
    fetchCount((initialCount) => { 
        count.value = initialCount
    })
})
</script>

<template>
<div>
    <h1>{{ appInfo.name }}</h1>
    <h2>{{ appInfo.slogan }}</h2>
</div>
</template>
```

# Typing Your callback functions


```vue
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

interface AppInfo { 
    name: string;
    slogan: string;
}

const count = ref<number | null>(null) // inferred type
const appInfo: AppInfo = reactive({ 
    name: 'Counter', 
    slogan: 'an app you can count on'
})

onMounted(() => { 
    fetchCount((initialCount) => { 
        count.value = initialCount
    })
})

function addAcount(num: number) { 
    if (count.value !== null){ 
        count.value += num
    }
}

const nextCount = computed(() => count.value += 1)
</script>

<template>
<div>
    <h1>{{ appInfo.name }}</h1>
    <h2>{{ appInfo.slogan }}</h2>
    <p> {{ count }}</p>
    <button @click="addCount(5)">Add</button>
</div>
</template>
```

# props with compiler macros

```vue
<script setup lang="ts">
import {ref, onMounted} from 'vue';
import { fetchCount } from '../fetchCount'

interface Props{ 
    limit: number; 
    alertMessageOnLimit?: string;
}

const props = withDefaults(
    defineProps<Props>(), 
    {
        alertMessageOnLimit: 'can not go any higher'
    }
);

/*  // more verbose method is too verbose
const props = defineProps({ 
    limit: { type: Number, required: true },
    alertMessageOnLimit: { type: String, required: true },
})
*/
const count = ref<number | null> (null);

onMounted(() => { 
    fetchCount((initialCount) => { 
        count.value = initialCount
    })
})

function addCount(num: number) { 
    if (count.value !== null){ 
        count.value += num
    }
}

</script>
```

# type-safe emit

```vue
<script setup lang="ts">

const emit = defineEmits<{
    ( event: 'add-count', num: number): void;
    ( event: 'reset-count'): void;
}>()
</script>

<template>
    <button type="button" @click="emit('add-count', 1)">Add</button>
    <button type="button" @click="emit('reset-count')">Reset</button>
</template>
```

IDE can static type check against 'defineEmit values'.

```vue 
<template>
    <ControlBar
        @add-count="addCount"
        @reset-count="count = 0"
    />
</template>
```

# vue vs. react: framework philosophy
