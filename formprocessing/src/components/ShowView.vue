<template>
    <div>
      <table class="table table-bordered">
        <thead>
          <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Idade</th>
          <th>Rua</th>
          <th>Bairro</th>
          <th>Estado</th>
          <th>Biografia</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody style="color: #D1CDC8 ;">
          <tr v-for="student in students" :key="student.id">
            <td>{{student.id}}</td>
            <td>{{student.fname}}</td>
            <td>{{student.lname}}</td>
            <td>{{student.idade}}</td>
            <td>{{student.rua}}</td>
            <td>{{student.bairro}}</td>
            <td>{{student.estado}}</td>
            <td>{{student.biografia}}</td>
            <td>
              <button class="btn btn-primary" @click="editStudent(student)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedStudent" class="popup">
        <div class="popup-content">
          <!-- Campos de edição -->
          <label>First Name</label>
          <input type="text" v-model="selectedStudent.fname">
          <label>Last Name</label>
          <input type="text" v-model="selectedStudent.lname">
          <label>Idade</label>
          <input type="text" v-model="selectedStudent.idade">
          <label>Rua</label>
          <input type="text" v-model="selectedStudent.rua">
          <label>Bairro</label>
          <input type="text" v-model="selectedStudent.bairro">
          <label>Estado</label>
          <input type="text" v-model="selectedStudent.estado">
          <label>Biografia</label>
          <input type="text" v-model="selectedStudent.biografia">
          
          <!-- Botão de salvar -->
          <button class="btn btn-primary" @click="saveStudentChanges">Save</button>
          <!-- Botão de fechar pop-up -->
          <button class="btn btn-secondary" @click="closePopup">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: "ShowView",
    data() {
      return {
        students: {},
        selectedStudent: null
      }
    },
    mounted(){
      this.loadStudentsTable();
    },
    methods: {
      loadStudentsTable: function(){
        axios.get("/api/students").then((res) => {
          this.students = res.data.data;
        })
        .catch(()=>{
          console.log("Something Went Wrong");
        })
      },
      editStudent(student) {
        this.selectedStudent = {...student};
      },
      saveStudentChanges() {
        this.selectedStudent.idade = parseInt(this.selectedStudent.idade);
        axios.patch(`/api/students/${this.selectedStudent.id}`, this.selectedStudent)
        .then(() => {
          this.loadStudentsTable();
          this.closePopup();
        }).catch(()=>{
          console.log("Failed to save changes");
        })
      },
      closePopup() {
        this.selectedStudent = null;
      }
    }
  };
  </script>

  <style scoped>
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .popup-content {
      background-color: #D1CDC8;
      padding: 20px;
      border-radius: 5px;
    }
  </style>