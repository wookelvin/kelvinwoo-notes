import { defineStore } from 'pinia'
import { ref } from 'vue';
/*
export const useTodoStore = defineStore({
  id: 'ToDo',
  state: () => ({
    items: [] as {id: number, label: string, completed: boolean}[],
    id: 0
  }),
  getters: {
    
  },
  actions: {
    addTodo(label: string) {
      if (!label){ 
        return;
      }
      this.items.unshift({
        completed: false, 
        label: label,
        id: this.id ++
      });
    },

    deleteTodo(id: number) {
      console.log('deleting id', id);
      this.items = this.items.filter(item => item.id !== id);
    },

    toggleTodoComplete(id: number){ 
      const item = this.items.find (item => item.id === id);
      if (!item){ 
        return;
      }
      item.completed = !item.completed;
    }
  }
})
*/

export const useTodoStore = defineStore('ToDo', () => {
  const items = ref<{id: number, label: string, completed: boolean}[]>([]);
  let id = 0;

  function addTodo(label: string) {``
    if (!label){ ``
      return;
    }
    items.value.unshift({
      completed: false, 
      label: label,
      id: id ++
    });
  }

  function deleteTodo(id: number) {
    console.log('deleting id', id);
    items.value = items.value.filter(item => item.id !== id);
  }

  function toggleTodoComplete(id: number){ 
    const item = items.value.find(item => item.id === id);
    if (!item){ 
      return;
    }
    item.completed = !item.completed;
  }
  
  return { 
    items, 
    addTodo, 
    deleteTodo, 
    toggleTodoComplete
  };

})