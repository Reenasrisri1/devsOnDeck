const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      minlength: [
        3,
        'Organisation name must be atleast 3 characters or longer',
      ],
    },
    isOrg: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [3, 'First name must be atleast 3 characters or longer'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [2, 'Last name must be atleast 2 characters or longer'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      minlength: [3, 'Email must be atleast 3 characters or longer'],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: 'Please enter a valid email',
      },
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      minlength: [5, 'Address must be atleast 5 characters or longer'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      minlength: [5, 'City must be atleast 5 characters or longer'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      minlength: [2, 'State must be 2 characters long'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be atleast 8 characters or longer'],
    },
    bio: {
      type: String,
      minlength: [2, 'Bio must be 2 characters long'],
    },
    language: {
      type: Array,
      default: [],
    },
    framework: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.virtual('confirmPassword')
  .get(() => {
    return this._confirmPassword;
  })
  .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
  console.log(this.password);
   console.log('------------------');
  console.log(this.confirmPassword);
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  console.log(`${this.isOrg}  ${this.orgName}`);
  if (this.isOrg && this.orgName.length<2){
      console.log('Failed orgName');
    this.invalidate('orgName', 'Organisation name is required');
  }
  next();
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});
  
module.exports = mongoose.model('User', UserSchema);
