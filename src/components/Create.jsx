import axios from "axios";

function Create () {
  <div class="back-container">
    <h2 class="back-title">Create Reminder</h2>

    <form >
      <div class="input-container">
        <input
          type="text"
          placeholder=""
          class="form-control"
         
          
          required
          v-model="name"
        />
        <label>Title</label>
      </div>
      <br />
      <div class="input-container2">
        <input
          type="time"
          placeholder=""
          class="form-control"
         
          v-model="notification"
        />
        <label>Set Reminder</label>
      </div>
      <button type="submit" class="btn">
        <span role="status" aria-hidden="true"></span>Submit
      </button>
    </form>
  </div>


export default {
  data() {
    return {
      name: "",
      notification: "",
      typing: false,
    };
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();
      let todo = {
        name: this.name,
        notification: this.notification,
        done: false, //false by default
      };
      
      this.$http
        .post("http://127.0.0.1:3000/", todo)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clearTodo() {
      this.name = "";
      this.notification = "";
    },

    refreshTodo() {
      bus.$emit("refreshTodo");
    },
  },
};

} 

export default Create