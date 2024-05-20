const { addproductschema, editproductschema } = require("./ProductValidation");
const { addStudentschema, editStudentschema } = require("./studentValidation");
const { Singupschema, Loginschema, emailschema } = require("./uservalidation");


module.exports = {
    Singupschema, Loginschema, emailschema, addproductschema, editproductschema, addStudentschema, editStudentschema
}