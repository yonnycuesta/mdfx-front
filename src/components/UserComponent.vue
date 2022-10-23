<template>
  <div class="container"></div>
</template>

<script>
// Import axios
import axios from "axios";

export default {
  name: "UserComponent",

  data() {
    return {
      user: [],
    };
  },

  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      axios
        .get("http://localhost:8080/api/users")
        .then((response) => {
          this.user = response.data.body;
          console.log(this.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
