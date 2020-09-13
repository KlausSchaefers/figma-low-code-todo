<template>
  <div class="home">
    <Figma :figma="figmaJSON" v-model="viewModel"/>
  </div>
</template>

<script>

import Vue from "vue";
import Figma from 'vue-low-code'
Vue.use(Figma);

import TodoService from './../services/ToDoService'
// import JSON file for deployment
import app from './app.json'

export default {
  name: 'Home',
  data: function () {
    return {
      figmaJSON: app,
      figmaConfig: {
        figmaFile: '',
        figmaAccessKey: '',
      },
      viewModel: {
        searchFilter: '',
        todos: [],
        newTodo: {
          name: "",
          details: ""
        },
        selectedTodo: {
          name: "",
          details: ""
        },
      },
      config: {
        components: {
          /**
           * Register costum components here
           */
        }
      }
    }
  },
  components: {
  },
  methods: {
    onHomeLoad () {
      console.debug('Home.onHomeLoad()')
      this.viewModel.todos = TodoService.findAll()
    },
    createNewTodo (e) {
      console.debug('Home.createNewTodo()', e.viewModel.newTodo.name, e.viewModel.newTodo.details)
      TodoService.create(e.viewModel.newTodo.name, e.viewModel.newTodo.details)
      e.viewModel.newTodo.name = ''
      e.viewModel.newTodo.details = ''
      return 'Home'
    },
    updateTodo (e) {
      console.debug('Home.updateTodo()', e.viewModel.selectedTodo.name, e.viewModel.selectedTodo.id)
      TodoService.update(e.viewModel.selectedTodo.id, e.viewModel.selectedTodo.name, e.viewModel.selectedTodo.details)
      return 'Home'
    },
    deleteTodo (e) {
      console.debug('Home.deleteTodo()', e.viewModel.selectedTodo.name, e.viewModel.selectedTodo.id)
      TodoService.delete(e.viewModel.selectedTodo.id)
      return 'Home'
    },
    filterTodo (e) {
      console.debug('Home.filterTodo()', e.viewModel.searchFilter)
      this.viewModel.todos = TodoService.findByFilter(e.viewModel.searchFilter)
    }
  }
}
</script>

<style>

  /**
   * Make it look like a mobile on desktop
   */
  @media only screen and (min-width: 600px) {
    .home {
      width: 375px;
      height: 667px;
      border-radius: 5px;
      margin: 150px auto;
      box-shadow: 0px 0px 20px 0px  rgba(0,0,0, 0.25);
      position: relative;
      overflow: auto;
    }

    .qux-element.qux-container.ButtonNew {
      position: absolute;
    }

    body {
      background: #cecece;
    }
  }

</style>
