const express = require('express');
const { usersInfo, privateKey } = require('./config');
const jwt = require('jsonwebtoken');
const { auth } = require('./middleware');
// const jwtRouter = express.Router();

// jwtRouter.post('/', employeeController.create);

const encrypt = (t) =>t; 

function loginFunction(req, res) {
  const { email, password } = req.body;

  let user = usersInfo.filter((x) => x.email === email) || null;
  user = (user  && user[0] ) || null;
  console.log(user);

if (user !== null) {
  if (user.password === encrypt(password)) {
    // login should be successfull
    token = jwt.sign({ username: email }, privateKey);
    res.status(200).send({ message: "Login Success", token })
  } else {
    // login pwd / email mismatch
    res.status(401).send({ message: "Unauthorized Access"})
  }
} else {
  // user does not exit;
  res.status(404).send({ message: "Not found"});
}
}


const routes = (app) => {

  app.post('/login', loginFunction);
  // app.use('/test', jwtRouter);

  app.get('/authRoute', auth ,(req, res) => { res.status(200).send('welcome ' + req.username)});

  app.get('/', (req, res) => {
    return res.send({ message: "JWT Service Up!"});
  }) 
}

module.exports = routes;