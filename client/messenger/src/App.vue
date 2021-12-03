<template>
  <div id="app">
    
    <HelloWorld/>
    <Reminders/>
  </div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Reminders from './components/Reminders.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Reminders
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
