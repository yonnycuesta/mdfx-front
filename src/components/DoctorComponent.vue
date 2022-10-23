<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{details.name}} {{details.lastName}}</h5>
          
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
             <div class="row mt-2">
                <div class="col-md-12" v-for="appointment in appointments" :key="appointment.id">
                    <h6 class="card-title">Citas Programadas</h6>
                <p class="card-text">
                    <ul class="list-group">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Morbi leo risus</li>
                        <li class="list-group-item">Porta ac consectetur ac</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
                </p>
                </div>
                <div class="col-md-12" v-for="specialitie in specialities" :key="specialitie.id">
                    <h6 class="card-title">Especialidades</h6>
                <p class="card-text">
                    <ul class="list-group">
                        <li class="list-group-item">{{specialitie.name}}</li>
                    </ul>
                </p>
                </div>
                <div class="col-md-12" v-for="schedule in schedules" :key="schedule.id">
                    <h6 class="card-title">Horarios</h6>
                <p class="card-text">
                    <ul class="list-group">
                        <li class="list-group-item">{{schedule.hour}} | {{schedule.status}}</li>
                    </ul>
                </p>
                </div>
             </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Nuevo Doctor</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="name">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Ingrese el nombre"
                />
              </div>
              <div class="form-group">
                <label for="lastname">Apellidos</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="lastname"
                  placeholder="Ingrese el apellido"
                />
              </div>
              <div class="form-group">
                <label for="name">Correo</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Ingrese el correo"
                />
              </div>
              <div class="form-group">
                <label for="phone">Teléfono</label>
                <input
                  type="tel"
                  class="form-control"
                  v-model="phone"
                  placeholder="Ingrese el teléfono"
                />
              </div>
              <button
                v-if="!isEdit"
                type="submit"
                class="btn btn-success"
                @click="saveDoctor()"
              >
                Agregar
              </button>
              <button
                v-if="isEdit"
                class="btn btn-info"
                style="color:white"
                @click="updateDoctor()"
              >
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card" style="width: 45em">
          <div class="card-header">
            <h5 class="card-title">Listado de Doctores</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id">
                  <td>{{ doctor.name }}</td>
                  <td>{{ doctor.lastName }}</td>
                  <td>{{ doctor.email }}</td>
                  <td>{{ doctor.phone }}</td>
                  <td style="display: flex; padding: 5px">
                    <button
                      class="btn btn-primary"
                      v-on:click="editDoctor(doctor.id)"
                    >
                      <i class="fas fa-edit"> </i>
                    </button>
                    <button
                      class="btn btn-danger ml-2"
                      v-on:click="deleteDoctor(doctor.id)"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      class="btn btn-secondary ml-2" 
                      data-toggle="modal" 
                      data-target="#exampleModal"
                      v-on:click="verDetalles(doctor)"
                    >
                    <i class="fas fa-eye"></i>
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
  name: "DoctorComponent",

  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      isEdit: false,
      doctorId: 0,
      doctors: [],

      details: [],
      specialities: [],
      schedules: [],
      appointments: []
    };
  },

  mounted() {
    this.getDoctors();
  },

  methods: {
    getDoctors() {
      axios
        .get("http://localhost:8080/api/doctors")
        .then((response) => {
          this.doctors = response.data.body;
          console.log(this.doctors);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveDoctor() {
      axios
        .post("http://localhost:8080/api/doctors", {
          name: this.name,
            lastName: this.lastname,
            email: this.email,
            phone: this.phone
        })
        .then(() => {
          this.getDoctors();
          this.name = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editDoctor(id) {
      axios
        .get("http://localhost:8080/api/doctors/" + id)
        .then((response) => {
          this.name = response.data.name;
          this.lastname = response.data.lastName;
          this.email = response.data.email;
          this.phone = response.data.phone;
          this.doctorId = response.data.id;
          this.isEdit = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateDoctor() {
      axios
        .put("http://localhost:8080/api/doctors/" + this.doctorId, {
          name: this.name,
          lastName: this.lastname,
          email: this.email,
          phone: this.phone
        })
        .then(() => {
          this.getDoctors();
          this.name = "";
          this.isEdit = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteDoctor(id) {
      axios
        .delete("http://localhost:8080/api/doctors/" + id)
        .then(() => {
          this.getDoctors();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    verDetalles(doctor) {
      // Abrir modal con detalles del doctor
        this.details = doctor;
        this.specialities = doctor.specialities;
        this.schedules = doctor.schedules;
        console.log(this.schedules);
        this.appointments = doctor.appointments;

    }
  },
};
</script>
