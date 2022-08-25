# Lessons

1. What is a composable? 
2. Flexible Arguments
3. Dynamic Return Values
4. Start with the interface
5. Async without Await

## What is a composable? 

A function that leverages the vue composition api to encapsulate and reuse stateful logic

/src/composables/mouse.js

```ts
import { ref, onMounted, onUnmounted} from 'vue'

export function useMouse(){ 
    const x = ref(0)
    const y = ref(0)

    function update(event) { 
        x.value = event.pageX
        y.value = event.pageY
    }
    
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    return { x,y };
}

/src/App.vue

```vue
<script setup>
    import { useMouse } from './composables/mouse';

    const { x, y} = useMouse(); // no arguments
</script>
<template>
    Mouse position is at {{x}}, {{y}}
</template>
```

We can provide composable inputs

```js
// an argument for each property
const title = useTitle('Product Page', true, '%s | My socks store');

// or using options argument
const useTitle = ({ title: 'Product Page', observe: true, titleTemplate: '%s | Socks Store'})

//both
// put required arguments in first and options argument for optional items
const title = useTitle('Product Page', { observe: true, titleTemplate: '%s | Socks Store' })
```

We can use destructuring this way. 

```ts
export function useTitle( newTitle, options) { 
    //provide default values this way
    const { 
        observe = false, 
        titleTemplate = '%s'
    } = options;
}
```

VueUse - Collection of compsables already created to handle reactive values

```
npm i @vueuse/core
```

Inside a component

```vue
<script setup>
    import { useTitle } from '@vueuse/core'
    const title = useTitle('GreenSocks', { titleTemplate '%s | My Store'})
</script>

<template>
    <h1>Title Composable</h1>
    <input v-model="title" type="text" >
</template>
```

UseRefHistory


```ts
import { useRefHistory } from '@vueuse/core'

const count = ref(0);
const { undo } = useRefHistory(count);

count.value ++;
console.log(counter.value);// 1
undo();
console.log(counter.value); // 0

```

## Flexible Arguments

Why Flexible Arguments? 
How to use Them
useTitle
useCSSVar

Almost all composables receive inputs

example of flexible input

```ts
//some can receive a ref
const title = ref('This is the title');
useTitle(title);
title.value = 'new title please';

//while others can receive a primitive (string)
const title = useTitle('this is the title');
title.value = 'new title please';
```

how we can do it in our own composables
```ts
//if we need a ref
export default useMyComposable(input){ 
    const ref = ref(input); //if already a ref, just returns a ref
}

//if we need a primitive
export default useMyComposable(input){ 
    const rawValue = unref(input); //if already a primitive, stays as a primitive
}

export function useTitle(newTitle, options) { 
    const title = ref(newTitle ?? document?.title ?? null)
    // ?? nullish coalescing operator
    // if it's null or undefined, then use the value on the right, better than 
    // || which is more of a falsey check which includes 0 or blank string. 
    // document?.title optional chaining operator which returns undefined if it doesn't exist
}

// in typescript
export function useTitle(
    newTitle: MaybeRef<string | null | undefined> = null, // type MaybeRef<T> = T | Ref<T>
    options
){
    const title = ref(newTitle ?? document?.title ?? null)
    ...
}
```

useCSSVar
Allows us to use a css variable in our vue `
```ts
//expecting a string
const backgroundColor = useCssVar('--background-color');

//also accepting a ref
const cssVarRef = ref('--background-color');
const backgroundColor = useCssVar(cssVarRef);
```

in the source 
```ts
export function useCssVar(props: MaybeRef<string>) { 
    ... 
    unref(prop) //if it's a ref or a string, returns a string
}
```

## Dynamic Return Values

Why & What
How To Implement

useInterval example: 

```ts
import { useInterval } from '@vueuse/core'
const counter = useInterval(200)
const { counter, pause, resume } = useInterval(200, { controls: true})
```

inside the composable we are sending controls optional argument where we can change what we return...
```ts
export default useComposable(input, optinos){ 
    const { controls = false } = options;

    if (controls){ 
        return { singleValue, secondvalue, thirdvalue };
    }else{ 
        return singleValue;
    }
}
```

if you run into naming conflicts you can rename it inside the composable.. i.e. 
```ts
export default useComposable(input, optinos){ 
    const { 
        controls: exposeControls = false, 
        immediate = true
    } = options

    const counter = ref(0);
    const controls = useIntervalFn(...);
    
    if (exposeControls){ 
        return { singleValue, secondvalue, thirdvalue };
    }else{ 
        return singleValue;
    }
}
```

Another example

```ts
const now = useNow()

const { now, pause, resume } = useNow({ controls: true })
```

Other examples
- useTimeout
- useTimestamp
- useTimeAgo

## Start with the interface

Your composable isn't future-proof. 
Solution: Write the interface first

Think about how you want it to be used before you actually write it in implementation. 
- take the time to think how it should be used

API (Application Program Interface) 

Harder to make changes later

1. What arguments do we pass to our composable? 
    - i.e. ref, raw, series of values? 
2. What options should be in our options object? 
3. What values does our composable return? 
    - single value or dynamic return pattern? 


Example: useMouse composable

1. What arguments do we pass to our composable? 
    - none
2. What options should be in our options object? 
    - type: mouse position based on 'page', 'client', default: 'page'
    - touch: listen to touchmove events? default: false
    - resetOnTouchEnds: reset to intial value on end
    - initialValue: { 0, 0} default
3. What values does our composable return? 
    - single value or dynamic return pattern? 
        - const { x, y} = useMouse();
    - we may want to know source type touchmove
        - const { x, y, sourceType } = useMouse();
    - we may want to store x&y inside a position object
        - const { position, positionArry, sourceType} = useMouse();



## Async without Await

The problem

```ts
const count = ref(0);
const { state }= await fetchData();
const doubleCount = computed(() => count * 2); // this is now blocked from occuring until the previous statement completes

// The async without await pattern
const count = ref(0);
const { state } = useAsyncState(fetchData());
const doubleCount = computed(() => count* 2);
//async data fetch won't interfere with our reactivity
```

This is what it will compile to (looks a lot more complicated)

```ts
export default useAysncState(promise) { 
    const state = ref(null);
    return state;

    const execute = async () => { 
        state.value = await promise;
    }

    execute();

    return state;
}
```

useAsyncQueue

- Executes each async task sequentially and passes the current task result to the next task

```ts
const { result } = useAsyncQueue([getFirstPromise, getSecondPromise]);
```

another good example for reference


```vue
<script setup>
import { useAsyncQueue } from '@vueuse/core'

const getFirstPromise = () => 
    new Promise( resolve => 
        setTimeout( () => resolve(2), 2000)
    );

const getFirstPromise = (result) => 
    new Promise( resolve => 
        setTimeout( () => resolve(3 + result), 2000)
    );


const {activeIndex, result} = useAsyncQueue([
    getFirstPromise, 
    getSecondPromise
])
</script>
<template>
<h1>activeIndex: {{activeIndex}}</h1>
<p>{{result}}</p>
<!--
    activeIndex: -1
    [{ "state": "pending", "data": null}, { "state": "pending", "data": null}, ]

    After 2 seconds

    activeIndex: 0
    [{ "state": "fulfilled", "data": 2}, { "state": "pending", "data": null}, ]

    After another 2 seconds
    activeIndex: 1
    [{ "state": "fulfilled", "data": 2}, { "state": "fulfilled", "data": 5}, ]
-->
</template>
```