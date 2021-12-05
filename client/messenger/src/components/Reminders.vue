<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card p-4">
            <h2>Reminders</h2>
         
        
            <form @submit.prevent="getReminders">
              <div class="form-group">
                <label for="getReminders">Name Your Reminder</label>
                <input
                  v-model="reminder._id"
                  type="text"
                  class="form-control"
                  
                />
                
              </div>
              
              <div class="form-group">
                <label for="getReminders">Enter Your Description</label>
                <input
                  v-model="reminder.priority"
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
    <div>{{ reminder._id }}</div>
            <div>{{ reminder.priority}}</div>
    
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

  
  methods: {
    


mounted() {
   
    axios.get("http://localhost:1337/api/reminders").then(response => {
      this.reminder = response.data;
    });
  },

    
    getReminders() {
        axios.get("http://localhost:1337/api/reminders").then(response =>{ 
            this.reminder = response.data;
            console.log(response.data)
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