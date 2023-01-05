const { Schema, model } = require('mongoose');
const Joi = require(joi);

module.exports.Category = model('categories', Schema({
    name: {
        type: String,
        unique: true
    }
}, { timestamp: true }));

module.exports.validate = category => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });
    return schema.validate(category);
}