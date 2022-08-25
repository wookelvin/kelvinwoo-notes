# Lightning Fast Builds w/ Vite

## Intro to vite

- Inside a vite project you can link directly to TS files 
- Vite will transcribe automatically
- using lodash_es to use es version of lodash
- can import CSS files directly into JS
- `import type { } from ... `
- works well even with vanilla TS
- in VITE, it doesn't reload for CSS changes.  (CSS hotreloading working out of box)
-  nor for js changes



```TS
import './style.css'
import { debounce } from 'lodash-es'

document.querySelector('div#app').innerHTML = 'Hello Vite!';

```

## CSS & Debugging

Vite comes with PostCSS out of box
- just install postcss plugin and use it. 

```bash
npm i postcss-nested
```

then create postcss.config.js
```js
module.exports = { 
    plugins: [
        require('postcss-nested')
    ]
}
```

vite converts css into js 

### CSS Modules

i.e. example.module.css (needs to be named with .module.css)
```css
.title{
    color: pink;
}

```

then in main.TS

```TS
import styles from 'example.module.css'

document.querySelector('#app').innerHTML = `
<h1 class="${styles.title}">Hello Vite!!!</h1>
<a href="https://vitejs.dev/guide/features.html">See features</a>
`
```

makes it so that two files with  the same class name will not onflict


### to use SASS/lodash_es

```bash
npm install sass
```

create style.scss

and import it as scss

hot-reloading is provided for all the preprocessors as well

### Working with Assets

you can import assets like so

```ts
import favicon from 'favicon.svg'

console.log(favicon); /// /favicon.svg

document.querySelector('#app').innerHTML = `
<img src="${favicon}" >
`
```

also when you build, the svg itself contains a hashed version of the SVG so it provides some additional cache busting features as well. 

If you don't want the hashed file, then move the svg file into the /public directory and can be accessed this way: 


```ts
document.querySelector('#app').innerHTML = `<img src="/icon.svg" >`
```

### To get it to work with vue files

npm i -D @vitejs/plugin-vue vue@next @vue/compiler-sfc

```ts

import App from './App.vue';
import { createApp } from 'vue'

createApp(App).mount('#app');
```

you'll also need to configure vite.config.js
```js
import vuePlugin from '@vitejs/plugin-vue';

export default { 
    plugins: [
        vuePlugin()
    ]
}

npm run preview
- starts a production preview server
- serves dist directory as a static file server


code-splitting comes for free out of box
so if we dynamically import files on load, it will split the css along with the js separately.


Moving to Vite
If you have an existing Vue CLI project it’s relatively straightforward to move over. There are a few things to keep in mind.

Env Variables
Vite exposes env variables on the import.meta.env global. Evan describes how to use this in the video, and you can read more in this documentation.

Require vs Import
When using webpack you might use require calls. In Vite we strongly recommend against require, because it’s technically a node.js concept and it won’t work well with Vite. However, if you’re using a depedency that uses require Vite will handle that.

Require.contents
This is a feature of webpack that allows you to look at the files of a directory at runtime. Vite has an equivalent called Glob Import, which you’ll want to use instead.

Learning More
To learn more about Vite, be sure to check out the documentation, or check out Awesome Vite.js, a curated list of awesome things related to Vite.

https://github.com/vitejs/awesome-vite