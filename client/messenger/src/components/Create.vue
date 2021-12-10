<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create Reminder</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="What do you want to do?"
          v-model="name"
          @keyup.enter="addTodo($event)"
        />
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="when?"
          v-model="notification"
          @keyup.enter="addTodo($event)"
        />
        <small class="form-text text-muted" v-show="typing">Hit enter to save</small>
      </div>
    </form>
  </div>
</template>
<script>
 // eslint-disable-next-line no-unused-vars
import axios from "axios";
import bus from "../bus.js";

export default {
  data() {
    return {
      name: "",
      notification: "",
      typing: false
    };
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();
      let todo = {
        name: this.name,
        notification: this.notification,
        done: false //false by default
      };
      console.log(todo);
      this.$http
        .post("http://127.0.0.1:3000/", todo)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    clearTodo() {
      this.name = "";
      this.notification = "" ;
    },

    refreshTodo() {
      bus.$emit("refreshTodo");
    }
  }
};
</script>
<style >
.underline {
  text-decoration: underline;
}
</style>