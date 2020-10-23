const yup = require('yup');
const ValidationError = require('../errors/validationError');

function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);
            next();
        } catch (error) {
        }
    };
}

function createUsersValidation(data) {
    const schema = yup.object().shape({
        // nombre: yup.string().matches(/^[a-z]+$/).required(),
        // apellido: yup.string().matches(/^[a-z]+$/).required(),
        password: yup.string().min(8).required(),
        email: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/).required(),
        // fechaNacimiento: yup.string().matches(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/).required(),
        
    });

    schema.validateSync(data);
}


module.exports = {
    validate,
    createUsersValidation
};
