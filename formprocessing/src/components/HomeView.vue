<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Name</label>
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="fname" placeholder="Primeiro Nome" />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="lname" placeholder="Sobrenome" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Idade</label>
          </div>
          <div class="col-md-6">
            <input type="number" class="form-control" placeholder="Idade" v-model="idade"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Rua</label>
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control" placeholder="Rua" v-model="rua" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Bairro</label>
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control" placeholder="bairro" v-model="bairro"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Estado</label>
          </div>
          <div class="col-md-6">
            <select name="" id="" class="form-select" v-model="estado">
              <option value="1">AC</option>
              <option value="2">AL</option>
              <option value="3">AP</option>
              <option value="4">AM</option>
              <option value="5">BA</option>
              <option value="6">CE</option>
              <option value="7">DF</option>
              <option value="8">ES</option>
              <option value="9">GO</option>
              <option value="10">MA</option>
              <option value="11">MT</option>
              <option value="12">MS</option>
              <option value="13">MG</option>
              <option value="14">PA</option>
              <option value="15">PB</option>
              <option value="16">PR</option>
              <option value="17">PE</option>
              <option value="18">PI</option>
              <option value="19">RJ</option>
              <option value="20">RN</option>
              <option value="21">RS</option>
              <option value="22">RO</option>
              <option value="23">RR</option>
              <option value="24">SC</option>
              <option value="25">SP</option>
              <option value="26">SE</option>
              <option value="27">TO</option>
            </select>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Biografia</label>
          </div>
          <div class="input-group">
            <textarea class="form-control" aria-label="With textarea" v-model="biografia"></textarea>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <button class="btn btn-primary" @click="registerStudent">Register</button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <img src="../../public/Images/Nerd-rafiki.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "HomeView",
  data() {
    return{
      fname: "",
      lname: "",
      idade: "",
      rua: "",
      bairro: "",
      estado: "",
      biografia: ""
    }
  },
  methods: {
    registerStudent: function() {
      console.log(this.fname, this.lname, this.idade, this.rua, this.bairro, this.estado, this.biografia)
      axios.post("/api/students", {
        fname: this.fname,
        lname: this.lname,
        idade: this.idade,
        rua: this.rua,
        bairro: this.bairro,
        estado: this.estado,
        biografia: this.biografia
      }).then((res) => {
        if(res.data.msg === "Validation Failed"){
          let errors = res.data.errors;
          let errorMsg = "";
          if(errors.fname.length != 0){
            for(let i=0; i<errors.fname.length; i++){
              errorMsg += `${errors.fname[i]}\n`;
            }
          } 
          
          if(errors.lname.length != 0){
            for(let i=0; i<errors.lname.length; i++){
              errorMsg += `${errors.lname[i]}\n`;
            }
          }

          if(errors.idade.length != 0){
            for(let i=0; i<errors.idade.length; i++){
              errorMsg += `${errors.idade[i]}\n`;
            }
          }

          if(errors.rua.length != 0){
            for(let i=0; i<errors.rua.length; i++){
              errorMsg += `${errors.rua[i]}\n`;
            }
          }

          if(errors.bairro.length != 0){
            for(let i=0; i<errors.bairro.length; i++){
              errorMsg += `${errors.bairro[i]}\n`;
            }
          }

          if(errors.estado.length != 0){
            for(let i=0; i<errors.estado.length; i++){
              errorMsg += `${errors.estado[i]}\n`;
            }
          }

          if(errors.biografia.length != 0){
            for(let i=0; i<errors.biografia.length; i++){
              errorMsg += `${errors.biografia[i]}\n`;
            }
          }

          alert(errorMsg);
        }
        else{
          alert("Successfully Saved");
        }

      }).catch(()=>{
        alert("Something Went Wrong");
      })
    }
  }
};
</script>

<style scoped>
img {
  height: 500px;
}
</style>