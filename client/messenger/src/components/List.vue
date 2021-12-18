<template>
  <div v-bind:show="todos.length > 0">
    <h1 class="title">Checklist</h1>
    
    <button
        class="refresh-btn animate"
        title="Delete Reminder?"
        v-on:click="refreshTodo()"
      >
        REFRESH
      </button>
 
      <br/>
      <div class="mom">
    <div class="item" v-for="(todo, index) in todos" :key="index">
      
      <label class="check">
        <input
          type="checkbox"
          v-model="todo.done"
          :checked="todo.done"
          :value="todo.done"
          v-on:change="updateTodo(todo)"
          title="Mark as done?"
        />
        <span class="checkmark"></span>
        <span class="tooltiptext">Mark As Done</span>
      </label>

      <label class="form-control for-tip">
      <input
        type="text"
        class="form-control"
        :class="todo.done ? 'todo__done' : ''"
        v-model="todo.name"
        @keypress="todo.editing = true"
        @keyup.enter="updateTodo(todo)"
      />
        <span class="update-text">Update Reminder</span>
      </label>  
      <button
        class="action-button animate red"
        title="Delete Reminder?"
        v-on:click="deleteTodo(todo._id)"
      >
        Delete
      </button>
    </div>
      </div>
    <div
      class="alert alert-primary todo__row"
      v-show="todos.length == 0 && doneLoading"
    >
      No more Reminders ;)
    </div>
    <div id="add">Add A Reminder?</div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import bus from "../bus.js";

export default {
  data() {
    return {
      todos: [],
      doneLoading: false,
    };
  },
  created: function () {
    this.fetchTodo();
    this.listenToEvents();
  },
  watch: {
    $route: function () {
      let self = this;
      self.doneLoading = false;
      self.fetchData().then(function () {
        self.doneLoading = true;
      });
    },
  },
  methods: {
    fetchTodo() {
      this.$http.get("http://127.0.0.1:3000/").then((response) => {
        this.todos = response.data;
      });
    },

    updateTodo(todo) {
      let id = todo._id;
      this.$http
        .put(`http://127.0.0.1:3000/${id}`, todo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteTodo(id) {
      // eslint-disable-next-line no-unused-vars
      this.$http.delete(`http://127.0.0.1:3000/${id}`).then((response) => {
        this.fetchTodo();
      });
    },

    listenToEvents() {
      // eslint-disable-next-line no-unused-vars
      bus.$on("refreshTodo", ($event) => {
        this.fetchTodo(); //update todo
      });
    },
    refreshTodo() {
      bus.$emit("refreshTodo");
    }
  },
};
</script>

