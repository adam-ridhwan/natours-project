const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  //! This is not secure, because we are allowing the user to send any data they want to the database. We need to filter out the data that we want to allow the user to send to the database.
  // const newUser = await User.create(req.body)

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, 'secret');

  res.status(201).json({
    status: 'success',
    data: { user: newUser },
  });
});
