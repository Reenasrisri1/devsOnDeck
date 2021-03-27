const userController = require('../controller/user.controller');
const PositionController = require('../controller/position.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function (app) {
  //users
  app.post('/api/register', userController.register);
  app.post('/api/login', userController.login);
  app.post('/api/logout', userController.logout);
  app.get('/api/user/loggedin', authenticate, userController.getLoggedInUser);

  //devs
  app.get('/api/dev', authenticate, userController.getAllDev);
  // app.post('/api/dev', userController.create);
  app.get('/api/dev/:id', authenticate, userController.getOne);
  app.put('/api/dev', authenticate, userController.update);
  app.delete('/api/dev/:id', authenticate, userController.delete);
  

  //orgs
  app.get('/api/org', authenticate, userController.getAllOrg);

  //Positions
  app.get('/api/position', authenticate, PositionController.getAllPosition);
  app.get('/api/position/:id', PositionController.getOne);
  app.post('/api/position', authenticate, PositionController.createPosition);
  app.get('/api/availableDevs/:id', PositionController.getAllAvailableMatchDevs);
};