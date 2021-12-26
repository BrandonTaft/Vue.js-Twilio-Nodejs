<template>
  <div v-bind:show="todos.length > 0">
    <h1 class="title">Checklist</h1>

    <button
      class="refresh-btn animate"
      title="Refresh List"
      v-on:click="refreshTodo()"
    >
      Refresh
    </button>

    <button
      class="refresh-btn animate"
      title="Erase Marks"
      v-on:click="clearMarks()"
    >
      Clear Marks
    </button>

    <div class="dropdown">
      <span>Sort By:</span>
      <div class="dropdown-content">
        <button
          class="refresh-btn animate"
          title="Sort Reminders"
          v-on:click="sortByHiPriority()"
        >
          Priority (Hi - Lo)
        </button>
        <button
          class="refresh-btn animate"
          title="Sort Reminders"
          v-on:click="sortByLoPriority()"
        >
          Priority (Lo - Hi)
        </button>
        <button
          class="refresh-btn animate"
          title="Sort Reminders"
          v-on:click="sortByAToZ()"
        >
          Name (A-Z)
        </button>
        <button
          class="refresh-btn animate"
          title="Sort Reminders"
          v-on:click="sortByZToA()"
        >
          Name (Z - A)
        </button>
      </div>
    </div>
    <br />
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
      <div class="dropdown">
        <span>Clock Icon</span>
        <div class="dropdown-content">
          {{todo.notification}}
          </div>
        </div>
        <label for="priority"></label>
        <select
          v-model="todo.priority"
          v-on:change="setPriority(todo)"
          onfocus="this.selectedIndex = -1;"
          name="priority"
          id="priority"
        >
          <option value="">Please Select</option>
          <option class="p-options" value="Defcon &#8548;">
            Defcon &#8548;
          </option>
          <option class="p-options" value="Defcon &#8547;">
            Defcon &#8547;
          </option>
          <option class="p-options" value="Defcon &#8546;">
            Defcon &#8546;
          </option>
          <option class="p-options" value="Defcon &#8545;">
            Defcon &#8545;
          </option>
          <option class="p-options" value="Defcon &#8544;">
            Defcon &#8544;
          </option>
        </select>
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
      selected: "",
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
        this.todos = response.data.sort((a, b) =>
          a.priority < b.priority ? 1 : -1
        );
      });
    },

    sortByHiPriority() {
      return this.todos.sort((a, b) =>
          a.priority < b.priority ? 1 : -1
      )},

    sortByLoPriority() {
      return this.todos.sort((a, b) =>
          a.priority < b.priority ? -1 : 1
      )},


    sortByAToZ() {
      return this.todos.sort((a, b) =>
          a.name < b.name ? -1 : 1
        );
    },

    sortByZToA() {
      return this.todos.sort((a, b) =>
          a.name < b.name ? 1 : -1
        );
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

    setPriority(todo) {
      console.log(todo.priority);
      let id = todo._id;
      this.$http
        .put(`http://127.0.0.1:3000/priority/${id}`, todo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clearMarks() {
      this.$http
        .put("http://127.0.0.1:3000/")
        .then(() => {
          this.refreshTodo();
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
    },
  },
};
</script>

