# Other Topics

## Suspense

- a component that is used to display template items while it waits for async components to completely finish loading i.e. 
- uses error fallback in case it needs to show error message
- can be used to display skeletal output until ready

```vue
<template>
  <div v-if="error">Uh oh .. {{ error }}</div>
  <Suspense v-else>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
import Event from "@/components/Event.vue";
import { ref, onErrorCaptured } from "vue";
export default {
  components: { Event },
  setup() {
    const error = ref(null);
    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });
    return { error };
  },
};
</script>
```

## Teleport

Can be used to move DOM elements between inside and outside the component. 

- state of the DOM is also preserved when this happens

```vue
<template>
  <teleport to="#end-of-body" :disabled="!showText">
    <video autoplay="true" loop="true" width="250">
      <source src="flower.webm" type="video/mp4">
    </video>
  </teleport>
  <div>
    This should be at the top.
  </div>
  <button @click="showText = !showText">
      Toggle showText
  </button>
</template>
<script>
export default {
  data() {
    return {
      showText: false
    };
  }
};
</script>
```

With multiple teleports to same destination

```vue
<template>
  <teleport to="#end-of-body" :disabled="!showText" v-if="showText">
    This should be at the end.
  </teleport>
  <teleport to="#end-of-body" :disabled="!showText2" v-if="showText2">
    This should be at the end too.
  </teleport>
  <div>
    This should be at the top.
  </div>
  <button @click="showText = !showText">
      Toggle showText
  </button>
  <button @click="showText2 = !showText2">
      Toggle showText2
  </button>
</template>
<script>
export default {
  data() {
    return {
      showText: false,
      showText2: false
    };
  }
};
</script>
```