<template>
  <div class="back-container">
    <h2 class="back-title">Create Reminder</h2>
   
    <form  @submit.prevent="addTodo">
      <div class="input-container">
        <input
          type="text"
          placeholder=""
          class="form-control"
          @keypress="typing=true"
          required
          v-model="name"
          
        />
        <label >Title</label>
      </div>
      <br />
      <div class="input-container2">
        <input
          type="time"
          placeholder=""
          class="form-control"
          @keypress="typing=true"
          
          v-model="notification"
          
        />
        <label >Set Reminder</label>
       
      </div>
      <button type="submit" class="btn " >
                <span
                  role="status"
                  aria-hidden="true"
                ></span>Submit
              </button>    
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
    },
    
  }
};
</script>
<style >
.underline {
  text-decoration: underline;
}
</style>