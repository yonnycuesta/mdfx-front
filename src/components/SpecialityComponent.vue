<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Nueva Especialidad</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" class="form-control" v-model="name" />
              </div>
              <button
                v-if="!isEdit"
                type="submit"
                class="btn btn-success"
                @click="saveSpeciality()"
              >
                Agregar
              </button>
              <button
                v-if="isEdit"
                class="btn btn-info"
                style="color: white"
                @click="updateSpeciality()"
              >
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card" style="width: 25em">
          <div class="card-header">
            <h5 class="card-title">Listado De Especialidades</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="speciality in specialities" :key="speciality.id">
                  <td>{{ speciality.name }}</td>
                  <td style="display: flex; padding: 5px">
                    <button
                      class="btn btn-primary"
                      v-on:click="editSpeciality(speciality.id)"
                    >
                      Editar
                    </button>
                    <button
                      class="btn btn-danger ml-2"
                      v-on:click="deleteSpeciality(speciality.id)"
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
  name: "SpecialityComponent",

  data() {
    return {
      specialities: [],
      name: "",
      editId: 0,
      isEdit: false,
    };
  },

  mounted() {
    this.getSpeciality();
  },

  methods: {
    getSpeciality() {
      axios
        .get("http://localhost:8080/api/specialities")
        .then((response) => {
          this.specialities = response.data;
          console.log(this.specialities);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveSpeciality() {
      axios
        .post("http://localhost:8080/api/specialities", {
          name: this.name,
        })
        .then((response) => {
          this.specialities = response.data;
          this.getSpeciality();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteSpeciality(id) {
      axios
        .delete("http://localhost:8080/api/specialities/" + id)
        .then((response) => {
          this.specialities = response.data;
          this.getSpeciality();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editSpeciality(id) {
      this.isEdit = true;
      axios
        .get("http://localhost:8080/api/specialities/" + id)
        .then((response) => {
          let datos = response.data;
          this.name = datos.name;
          this.editId = datos.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateSpeciality() {
      axios
        .put("http://localhost:8080/api/specialities/" + this.editId, {
          name: this.name,
        })
        .then((response) => {
          this.specialities = response.data;
          this.getSpeciality();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
