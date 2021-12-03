<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card p-4">
            <h2>Reminders</h2>
         
        
            <form @submit.prevent="addReminder">
              <div class="form-group">
                <label for="addReminder">Name Your Reminder</label>
                <input
                  v-model="reminder"
                  type="text"
                  class="form-control"
                  
                />
                
              </div>
              
              <div class="form-group">
                <label for="addReminder">Enter Your Description</label>
                <input
                  v-model="reminder"
                  class="form-control"
                  type="text"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div>{{ reminder }}</div>
            <div>{{ reminder}}</div>
    
  </section>
</template>
<script>


import axios from "axios";
export default {
  data() {
    return {
      reminder: {
        name: "",
        priority: ""
      },
      loading: false
    };
  },
  created() {
   
    axios.get("http://localhost:1337/api/reminders").then(response => {
      this.reminder = response.data.data;
    });
  },
  methods: {
    
    getReminders() {
        axios.get("http://localhost:1337/api/reminders").then((res) =>{ 
            this.reminder = res.data;
        })
    } 
    ,


     addReminder() {
      this.loading= true
    
         axios.post(
          "http://localhost:1337/api/addreminders",
          this.reminder
          ) ,
          this.getReminders() ,
          console.log('igiveup')
        
    }
        
  }   
        
      
      
    
  
};
</script>