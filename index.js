const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3307,
    password: "",
    database: "forms"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});


app.get("/", (req, res) => {
    res.send("Hello From The Server");
})


function validateFName(fname) {
    let errors = [];
    if (fname.length == 0) {
        errors.push("First Name Is Null");
    }

    if (fname.length > 50) {
        errors.push("First Name Length Can Not Exceed 50 Characters.");
    }

    return errors;
}

function validateLName(lname) {
    let errors = [];
    if (lname.length == 0) {
        errors.push("Last Name Is Null");
    }

    if (lname.length > 50) {
        errors.push("Last Name Length Can Not Exceed 50 Characters.");
    }

    return errors;
}

function validateBairro(bairro) {
    let errors = []
    if(!bairro || bairro.length === 0) {
        errors.push("Bairro é Null")
    }
    
    return errors
}

function validateRua(rua){
    let errors = []
    if(!rua || rua.length === 0) {
        errors.push("Rua é Null")
    }

    //verificar se o comprimento da rua for maior que 100? opcional
    // if(rua.length > 100){
    //     errors.push("Rua deve ter no maximo 100 caracteres")
    // }

    return errors
}

function validateIdade(idade) {
    let errors = [];

    // checks whether age is null or not
    if (!idade && idade !== 0) {
        errors.push("Idade é Null");
    }

    // checks whether age is an integer or not
    if (!Number.isInteger(idade)) {
        errors.push("Idade deve ser um número inteiro");
    }

    return errors;
}

function validateEstado(estado) {
    let errors = [];
    if (estado.length == 0) {
        errors.push("Estado Is Null");
    }

    if (estado > 27) {
        errors.push("Estado invalido");
    }

    return errors;
}

function validateBiografia(biografia) {
    let errors = [];
    if(!biografia || biografia.length === 0){
        errors.push("Biografia é Null")
    }
    return errors;
}


app.post("/api/students", (req, res) => {
    console.log("Requesey..	");
    let fname = req.body.fname;
    let lname = req.body.lname;
    let idade = req.body.idade;
    let rua = req.body.rua;
    let bairro = req.body.bairro;
    let estado = req.body.estado;
    let biografia = req.body.biografia;

    let errFName = validateFName(fname); // will validate first name
    let errLName = validateLName(lname); // will validate last name
    let errIdade = validateIdade(idade); // will validate idade
    let errRua = validateRua(rua); // will validate rua
    let errBairro = validateBairro(bairro); // will validate bairro
    let errEstado = validateEstado(estado); // will validate estado
    let errBiografia = validateBiografia(biografia); // will validate biografia

    if (errFName.length || errLName.length || errIdade.length || errRua.length || errBairro.length || errEstado.length || errBiografia.length) {
        res.json(200, {
            msg: "Validation Failed",
            errors: {
                fname: errFName,
                lname: errLName,
                idade: errIdade,
                rua: errRua,
                bairro: errBairro,
                estado: errEstado,
                biografia: errBiografia
            }
        });
    }
    else {
        let query = `INSERT INTO STUDENTS (fname, lname, bairro, rua, idade, estado, biografia) VALUES ('${fname}', '${lname}', '${bairro}', '${rua}', '${idade}', '${estado}', '${biografia}')`;

        connection.query(query, (err, result) => {
            if (err) {
                // status code 500 is for Internal Server Error
                res.json(500, {
                    msg: "Some thing went wrong please try again"
                })
            }

            // if we reach till this point means record is inserted succesfully


            res.json(200, {
                msg: "Student Registered Succesfully",
            })
        })

    }
});


app.get("/api/students", (req, res) => {
    let query = "SELECT * FROM STUDENTS";

    connection.query(query, (err, result) => {
        if (err) {
            res.json(500, {
                msg: "Internal Server Error Please Try Again"
            })
        }

        res.send(200, {
            msg: "All the data fetched successfully",
            data: result
        })
    })
})

app.put("/api/students", (req, res) => {
    const studentId =req.params.id;
    const { fname, lname, bairro, rua, idade, estado, biografia } = req.body;
    if(!studentId){
        return res.status(400).json({ msg: "ID do aluno não fornecido" });
    }

    const query = `
    UPDATE STUDENTS
    SET fname=?, lname=?, idade=?, rua=?, bairro=?, estado=?, biografia=?
    WHERE id=?`

    const values = [fname, lname, idade, rua, bairro, estado, biografia, studentId];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar aluno:", err);
            return res.status(500).json({ msg: "Falha ao atualizar aluno" });
        } else {
            console.log("Aluno atualizado com sucesso.");
            return res.status(200).json({ msg: "Aluno atualizado com sucesso" });
        }
    });
})

app.listen(3000, () => {
    console.log("Server started ...");
});