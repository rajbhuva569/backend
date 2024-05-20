const Joi = require('joi');

const Singupschema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')).required()
})
const Loginschema = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')).required()
})
const emailschema = Joi.object({

    email: Joi.string().email().required(),

})
module.exports = { Singupschema, Loginschema, emailschema }
