<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Nuevo Horario</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="hour">Hora</label>
                <input type="time" class="form-control" v-model="hour" />
              </div>
              <div class="form-group">
                <label for="hour">Doctor</label>
                <select class="form-control form-select" v-model="doctorId">
                  <option
                    v-for="doctor in doctors"
                    :key="doctor.id"
                    :value="doctor.id"
                  >
                    {{ doctor.name }} {{ doctor.lastName }}
                  </option>
                </select>
              </div>
              <button
                v-if="!isEdit"
                type="submit"
                class="btn btn-success"
                @click="saveSchedule()"
              >
                Agregar
              </button>
              <button
                v-if="isEdit"
                class="btn btn-info"
                style="color: white"
                @click="updateSchedule()"
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
            <h5 class="card-title">Listado de Horarios</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Hora</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="schedule in schedules" :key="schedule.id">
                  <td>{{ schedule.hour }}</td>
                  <td>{{ schedule.status }}</td>
                  <td style="display: flex; padding: 5px">
                    <button
                      class="btn btn-primary"
                      v-on:click="editSchedule(schedule.id)"
                    >
                      Editar
                    </button>
                    <button
                      class="btn btn-danger ml-2"
                      v-on:click="deleteSchedule(schedule.id)"
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
  name: "ScheduleComponent",
  data() {
    return {
      status: "Disponible",
      hour: "",
      doctorId: 0,
      doctors: [],
      schedules: [],
      isEdit: false,
      id: "",
    };
  },
  mounted() {
    this.getSchedules();
    this.getDoctors();
  },
  methods: {
    saveSchedule() {
      console.log(this.doctorId, this.hour, this.status);
      axios
        .post("http://localhost:8080/api/schedules", {
          hour: this.hour,
          status: this.status,
          doctor: {
            id: this.doctorId,
          },
        })
        .then((response) => {
          this.status = response.data.status;
          this.getSchedules();
        });
    },
    getSchedules() {
      axios.get("http://localhost:8080/api/schedules").then((response) => {
        this.schedules = response.data;
        console.log(this.schedules);
      });
    },
    getDoctors() {
      axios
        .get("http://localhost:8080/api/doctors")
        .then((response) => {
          this.doctors = response.data.body;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editSchedule(id) {
      axios
        .get("http://localhost:8080/api/schedules/" + id)
        .then((response) => {
          this.id = response.data.id;
          this.hour = response.data.hour;
          this.status = response.data.status;
          this.isEdit = true;
        });
    },
    updateSchedule() {
      axios
        .put("http://localhost:8080/api/schedules/" + this.id, {
          name: this.name,
        })
        .then((response) => {
          this.status = response.data.status;
          this.name = "";
          this.isEdit = false;
          this.getSchedules();
        });
    },
    deleteSchedule(id) {
      axios
        .delete("http://localhost:8080/api/schedules/" + id)
        .then((response) => {
          this.status = response.data.status;
          this.getSchedules();
        });
    },
  },
};
</script>
