<template>
  <div class="back-container">
    <h2 class="back-title">Send Text</h2>
    <form @submit.prevent="sendMessage">
      <div class="input-container">
        <input
          v-model="message.to"
          type="text"
          placeholder=""
          class="form-control"
          required
        />
        <label for="Number">Enter Phone Number</label>
      </div>
      <br />
      <div class="input-container">
        <textarea
          type="text"
          v-model="message.message"
          class="form-control"
          required
        />
        <label for="Number">Enter Message</label>
      </div>
      <button type="submit" class="btn">
        <span
          v-if="loading"
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
        ></span
        >Send
      </button>
    </form>
  </div>
</template>
<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  data() {
    return {
      message: {
        to: "",
        message: "",
      },
      loading: false,
    };
  },
  methods: {
    async sendMessage() {
      this.loading = true;
      try {
        let response = await axios.post(
          "http://localhost:3000/send-message",
          this.message
        );
        console.log(response);
        swal("Success", response.data.message, "success");
        this.loading = false;
        this.clearTodo();
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        this.loading = false;
        console.log(err);
      }
    },
    clearTodo() {
      this.message.to = "";
      this.message.message = "" ;
    },
  },
};
</script>