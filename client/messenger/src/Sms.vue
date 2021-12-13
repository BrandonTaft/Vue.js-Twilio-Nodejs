<template>
  <div class="sms-container">
    <Create></Create>
    <Messenger></Messenger>
  </div>
</template>

<script>
import Create from "./components/Create.vue";
import Messenger from "./components/Messenger";

export default {
  name: "Sms",
  components: {
    Create,
    Messenger,
  },
};
</script>


