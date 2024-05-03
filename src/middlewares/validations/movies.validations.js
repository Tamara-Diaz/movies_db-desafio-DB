
const { body } = require('express-validator');

const fieldTitle = body('title')
.notEmpty()
.withMessage("El campo Title es requerido")
.bail()
.isLength({ min: 5, max: 500})
.withMessage('Debe tener un minimo de 5 y maxímo 500 caracteres');

const fieldRating = body('rating')
.notEmpty()
.withMessage('El campo Rating es requerido')
.bail()
.isDecimal()
.withMessage("El valor debe ser decimal");

const fieldAwards = body('awards')
.notEmpty()
.withMessage('El campo Awards es requerido')
.bail()
.isNumeric()
.withMessage('El valor debe ser numérico');

const fieldReleaseDate =  body('release_date')
.notEmpty()
.withMessage('El campo Release Date es requerido')

const fieldLength = body('length')
.notEmpty()
.withMessage('El campo Length es requerido')
.bail()
.isNumeric()
.withMessage('El valor tiene que ser numérico');

module.exports = {
    addEditValidation : [fieldTitle, fieldRating, fieldAwards, fieldReleaseDate, fieldLength]
}