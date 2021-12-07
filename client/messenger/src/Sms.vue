<template>
  <div class="container">
    <div class="row vertical-centre justify-content-center mt-50">
      <div class="col-md-6 mx-auto">
        
        <Messenger></Messenger>
  </div>
    </div>
  </div>
</template>

<script>

import Messenger from './components/Messenger'


export default {
  name: 'Sms',
  components: {
    
    Messenger
    
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
