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
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option> 
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
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