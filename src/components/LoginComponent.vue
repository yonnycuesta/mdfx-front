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
                  <h5 class="card-title text-center pb-0 fs-4">
                    Ingrese a su cuenta
                  </h5>
                </div>
                <form class="row g-3 needs-validation">
                  <div class="col-12">
                    <label for="username" class="form-label"
                      >Correo electrónico</label
                    >
                    <input type="email" class="form-control" />
                  </div>
                  <div class="col-12">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" />
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary w-100" type="submit">
                      Iniciar sesión
                    </button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">
                      No tengo cuenta? <RouterLink to="/register">Crea una cuenta</RouterLink>
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
export default {
  name: "LoginComponent",
};
</script>

<style></style>
