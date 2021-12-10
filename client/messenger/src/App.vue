<template>
  <div class="container">
    <div class="row vertical-centre justify-content-center mt-50">
      <div class="col-md-6 mx-auto">
        <Create></Create>
        <List></List>
       
  </div>
    </div>
  </div>
</template>

<script>
import Create from './components/Create.vue'

import List from "./components/List.vue";

export default {
  name: 'App',
  components: {
    Create,
    List,
    
    
  }
}
</script>

