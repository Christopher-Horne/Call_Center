import { Schema, model } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import validator from 'validator'
const { isEmail } = validator

const CustomerSchema = new Schema({
    customerName:{
        type: String,
        required:[true, "Customer name is required"],
        maxLength:[50, "Username must be less than 50 characters"]
    },

    email:{
        type: String,
        required:[false],
        maxLength:[100, "Email must be less than 100 characters"],
        validate: [isEmail, 'Not an email'],
        unique: [true, 'Email already exists']
    },
    
    streetAddress:{
        type: String,
        required:[true, "Street address is required"],
        minLength:[4, "Address must be 4 or more characters"],
        maxLength:[100, "Address must be less than 100 characters"]
    },

    city:{
        type: String,
        required:[true, "City is required"],
        minLength:[4, "City must be 4 or more characters"],
        maxLength:[50, "City must be less than 50 characters"]
    },

    state:{
        type: String,
        required:[true, "State is required"],
        minLength:[4, "State must be 4 or more characters"],
        maxLength:[50, "State must be less than 50 characters"]
    },

    zipCode:{
        type: String,
        required:[true, "Zip/Country code is required"],
        minLength:[4, "Zip/Country code must be 4 or more characters"],
        maxLength:[100, "Zip/Country code must be less than 100 characters"]
    },

    country:{
        type: String,
        required:[true, "Country is required"],
        minLength:[4, "Country must be 4 or more characters"],
        maxLength:[100, "Country must be less than 100 characters"]
    }
}, { timestamps: true })

CustomerSchema.plugin(mongooseUniqueValidator) // .plugin is a middleware to bring in the mongooseUniqueValidator so the unique field works correctly.

// add this after UserSchema is defined
// UserSchema.virtual('confirmPassword')
//     .get(function () {
//         return this._confirmPassword
//     })
//     .set(function (value) {
//         this._confirmPassword = value
//     })


// UserSchema.pre('validate', function (next) {
//     if (this.password !== this.confirmPassword) {
//         this.invalidate('confirmPassword', 'Passwords dont match')
//     }
//     next()
// })

// UserSchema.pre('save', function (next){
//     bcrypt.hash(this.password, 10)
//         .then(hash => {
//             console.log('HASH: ', hash);
//             this.password = hash
//             next()
//         })
// })

const Customer = model('Customer', CustomerSchema);
export default Customer;