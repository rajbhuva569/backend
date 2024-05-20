const validation = require('./Validation/index');
const validate = (schema) => async (req, res, next) => {
    console.log(schema, "schema=====================");
    if (!validation[schema]) {
        throw new Error('Validation not found!');
    }
    try {

        const validatevalue = await validation[schema].validateAsync(req.body);
        req.body = validatevalue;
        next();

    } catch (error) {
        return res
            .status(400)
            .json({
                status: false,
                data: [],
                message: error.message,
            });
    }

}
module.exports = {
    validate
}