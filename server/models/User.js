import { Schema, model } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import validator from 'validator'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    userName:{
        type: String,
        required:[true, "Username is required"],
        minLength:[4, "Username must be 4 or more characters"],
        maxLength:[50, "Username must be less than 50 characters"],
        unique: [true, 'Username already exists']
    },
    
    password:{
        type: String,
        required:[true, "Password is required"],
        minLength:[8, "Password must be 8 or more characters"],
        maxLength:[50, "Password must be less than 50 characters"]
    },

    role:{
        type: String,
        required:[true, "Role is required"]
    }
}, { timestamps: true })

UserSchema.plugin(mongooseUniqueValidator) // .plugin is a middleware to bring in the mongooseUniqueValidator so the unique field works correctly.

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword
    })
    .set(function (value) {
        this._confirmPassword = value
    })


UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords dont match')
    }
    next()
})

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            //console.log('HASH: ', hash);
            this.password = hash
            next()
        })
})

const User = model('User', UserSchema);
export default User;