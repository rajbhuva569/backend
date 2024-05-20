const Joi = require('joi');

const addproductschema = Joi.object({
    product_name: Joi.string().required(),
    price: Joi.number().required(),
    descrption: Joi.any().required(),
    imagename: Joi.string().required(),
})
const editproductschema = Joi.object({
    product_name: Joi.string().required(),
    price: Joi.number().required(),
    descrption: Joi.string().required(),
    imagename: Joi.string().required(),
})

module.exports = { addproductschema, editproductschema }
// .strict()