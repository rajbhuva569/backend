const Joi = require('joi');

const addStudentschema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    marks: Joi.number().required(),
    mobile_number: Joi.number().required(),
    std: Joi.string().required(),
    imagename: Joi.string().required(),
})
const editStudentschema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    marks: Joi.number().required(),
    mobile_number: Joi.number().required(),
    std: Joi.string().required(),
    imagename: Joi.string().required(),
})

module.exports = { addStudentschema, editStudentschema }
