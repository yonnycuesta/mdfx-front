<template>
  <div class="container">
    <section
      class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
          >
            <div class="card mb-3">
              <div class="card-body">
                <div class="pt-4 pb-2">
                  <h5 class="card-title text-center pb-0 fs-4">Crear cuenta</h5>
                </div>
                <form class="row g-3 needs-validation">
                  <div class="col-12">
                    <label for="username" class="form-label">Usuario</label>
                    <input
                      type="text"
                      v-model="username"
                      class="form-control"
                    />
                  </div>
                  <div class="col-12">
                    <label for="email" class="form-label"
                      >Correo electrónico</label
                    >
                    <input type="email" v-model="email" class="form-control" />
                  </div>
                  <div class="col-12">
                    <label for="password" class="form-label">Contraseña</label>
                    <input
                      type="password"
                      v-model="password"
                      class="form-control"
                    />
                  </div>
                  <div class="col-12">
                    <button
                      class="btn btn-primary w-100"
                      @click="registerUser()"
                    >
                      Crear cuenta
                    </button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">
                      Tengo una cuenta?
                      <RouterLink to="/login">Inicia sesión</RouterLink>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterComponent",

  data() {
    return {
      user: [],
      username: "",
      email: "",
      password: "",
    };
  },

  mounted() {},

  methods: {
    registerUser() {
      axios
        .post("http://localhost:8080/api/users", {
          username: this.username,
          email: this.email,
          password: this.password,
        })
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

<style>
.register-one {
}
</style>
