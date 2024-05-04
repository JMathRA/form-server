const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.listen(3000, () => console.log('Server running on port 3000'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'forms'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
})

app.use(bodyParser())
app.post('/people', (req, res) => {
    
})

let fname = req.body.fname;
let lname = req.body.lname;
let email = req.body.email;
let contactno = req.body.contactno;
let birthdate = req.body.birthdate;
let semester = req.body.semester;

function validadeName(lname){
    let erros = []
    if(lname.length == 0){
        erros.push('Last name is null')
    }

    if(lname.length > 50){
        erros.push('Last name length can not exceed 50 characters')
    }

    return erros
}

function validateBirthDate(date) {
    let errors = [];
    if (date === undefined || date === "") {
        errors.push("Birth Date is Null");
    }
    return errors;
}

function validateContactNo(contactno) {
    let errors = [];

    // check whether contact no is empty or not
    if (contactno.length == 0) {
        errors.push("Contact Number Is Null");
    }

    // cheaks whether contact no length is less then 10 character
    if (contactno.length < 10) {
        errors.push("Contact Number Must Be Of 10 Digits");
    }

    // checks whether contact no length is more then 10 character
    if (contactno.length > 10) {
        errors.push("Contact No Must Be of 10 Digits");
    }

    // Using regular expression check whether contactno is only containing digits or not
    if (!(/[0-9]/g.test(contactno))) {
        errors.push("Contact Number Must Contain Digits Only");
    }

    return errors;
}
function validateEmail(email) {
    let errors = [];

    // checks whether email is empty or not
    if (email.length == 0) {
        errors.push("Email Is Null");
    }

    // checks whether email length is more then 100 or not
    if (email.length > 100) {
        errors.push("Email Can not exceed 100 Character");
    }

    // checks whether email is valid or not usinf regular expression
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email))) {
        errors.push("Email Is Not Valid");
    }

    return errors;
}

function validateSemester(semester) {
    let errors = [];
    if (semester.length == 0) {
        errors.push("Semester Is Null");
    }

    if (semester > 8) {
        errors.push("Invalid Semester");
    }

    return errors;
}

function validateCourse(course) {
    let errors = [];
    if (course !== "B.Tech Computer Engineering" && course !== "B.Tech Information Technology") {
        errors.push("Invalid Course");
    }
    return errors;
}