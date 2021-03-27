const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  
  getAllDev: (req, res) => {
    User.find()
      .sort({ type: 'descending' })
      .then((allUsers) => {
        console.log(allUsers);
        let allDevs = [];
        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].isOrg === false) {
            allDevs.push(allUsers[i]);
          }
        }
        console.log('==================');
        console.log(allDevs);
        res.json(allDevs);
      })
      .catch((err) => {
        console.log(`error in getAll:${err}`);
        res.json(err);
      });
  },

  getAllOrg: (req, res) => {
    User.find()
      .sort({ type: 'descending' })
      .then((allUsers) => {
        console.log(allUsers);
        let allOrg = [];
        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].isOrg === true) {
            allOrg.push(allUsers[i]);
          }
        }
        console.log('==================');
        console.log(allOrg);
        res.json(allOrg);
      })
      .catch((err) => {
        console.log(`error in getAll:${err}`);
        res.json(err);
      });
  },

  getOne: (req, res) => {
    console.log(req.params.id);
    User.findById(req.params.id)
      .then((oneDev) => {
        console.log(`oneDev: ${oneDev}`);
        res.json(oneDev);
      })
      .catch((err) => {
        console.log(`error in getOne:${err}`);
        res.json(err);
      });
  },

  update: (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
  
    console.log(decodedJWT.payload._id);
  
    console.log(req.body);
    User.findByIdAndUpdate(decodedJWT.payload._id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((udatedDev) => {
        console.log(udatedDev);
        res.json(udatedDev);
      })
      .catch((err) => {
        console.log(`error in update:${err}`);
        res.json(err);
      });
  },

  delete: (req, res) => {
    console.log(req.params.id);
    User.findByIdAndRemove(req.params.id)
      .then((removedDev) => {
        console.log(removedDev);
        res.json(removedDev);
      })
      .catch((err) => {
        console.log(`error in delete:${err}`);
        res.json(err);
      });
  },

  register: (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res
          .cookie(
            'usertoken',
            jwt.sign(
              {
                _id: user._id,
                isOrg: user.isOrg,
              },
              process.env.JWT_SECRET
            ),
            {
              httpOnly: true,
              expires: new Date(Date.now() + 900000000),
            }
          )
          .json({
            msg: 'Success!',
            userLogged: {
              username: `${user.firstName} ${user.lastName}`,
            },
          });
        //res.json({ msg: 'Success!', user: user });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  login(req, res) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.status(400).json({ msg: 'Invalid login attempt' });
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              if (passwordIsValid) {
                res
                  .cookie(
                    'usertoken',
                    jwt.sign(
                      {
                        _id: user._id,
                        isOrg: user.isOrg,
                      },
                      process.env.JWT_SECRET
                    ),
                    {
                      httpOnly: true,
                      expires: new Date(Date.now() + 900000000),
                    }
                  )
                  .json({
                    msg: 'Success!',
                    userLogged: {
                      username: `${user.firstName} ${user.lastName}`,
                    },
                  });
              } else {
                res.status(400).json({ msg: 'invalid login attempt' });
              }
            })
            .catch((err) =>
              res.status(400).json({ msg: 'invalid login attempt' })
            );
        }
      })
      .catch((err) => res.json(err));
  },

  logout(req, res) {
    res.clearCookie('usertoken');
    res.json({ msg: 'usertoken cookie cleared' });
  },

  logout2(req, res) {
    res
      .cookie('usertoken', jwt.sign({ _id: '' }, process.env.JWT_SECRET), {
        httpOnly: true,
        maxAge: 0,
      })
      .json({ msg: 'ok' });
  },

  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

    User.findById(decodedJWT.payload._id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
};