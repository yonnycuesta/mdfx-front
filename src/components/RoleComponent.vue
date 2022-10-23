<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Nuevo Rol</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="name">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Ingrese el nombre del rol"
                />
              </div>
              <button
                v-if="!isEdit"
                type="submit"
                class="btn btn-success"
                @click="saveRole()"
              >
                Agregar
              </button>
              <button v-if="isEdit" class="btn btn-info" @click="updateRole()">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card" style="width: 25em">
          <div class="card-header">
            <h5 class="card-title">Listado de Roles</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="role in roles" :key="role.id">
                  <th scope="row">{{ role.id }}</th>
                  <td>{{ role.name }}</td>
                  <td style="display: flex; padding: 5px">
                    <button
                      class="btn btn-primary"
                      v-on:click="editRole(role.id)"
                    >
                      Editar
                    </button>
                    <button
                      class="btn btn-danger ml-2"
                      v-on:click="deleteRole(role.id)"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RoleComponent",

  data() {
    return {
      roles: [],
      name: "",
      editId: 0,
      isEdit: false,
    };
  },

  mounted() {
    this.getRole();
  },

  methods: {
    getRole() {
      axios
        .get("http://localhost:8080/api/roles")
        .then((response) => {
          this.roles = response.data;
          console.log(this.roles);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveRole() {
      axios
        .post("http://localhost:8080/api/roles", {
          name: this.name,
        })
        .then((response) => {
          this.roles = response.data;
          this.getRole();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteRole(id) {
      axios
        .delete("http://localhost:8080/api/roles/" + id)
        .then((response) => {
          this.roles = response.data;
          this.getRole();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editRole(id) {
      this.isEdit = true;
      axios
        .get("http://localhost:8080/api/roles/" + id)
        .then((response) => {
          let datos = response.data;
          this.name = datos.name;
          this.editId = datos.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateRole() {
      axios
        .put("http://localhost:8080/api/roles/" + this.editId, {
          name: this.name,
        })
        .then((response) => {
          this.roles = response.data;
          this.getRole();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
