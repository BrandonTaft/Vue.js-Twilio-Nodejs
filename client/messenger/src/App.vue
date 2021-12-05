<template>
  <div class="container">
    <div class="row vertical-centre justify-content-center mt-50">
      <div class="col-md-6 mx-auto">
        <AddReminder></AddReminder>
        <Reminders></Reminders>
        <ListTodo></ListTodo>
  </div>
    </div>
  </div>
</template>

<script>
import AddReminder from './components/AddReminder.vue'
import Reminders from './components/Reminders'
import ListTodo from "./components/ListTodo.vue";

export default {
  name: 'App',
  components: {
    AddReminder,
    Reminders,
    ListTodo
  }
}
</script>

<style>

@import './assets/styles/main.css';
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
