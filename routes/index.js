const Express = require('express');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

const app = Express();

// Rutas
const queryRouter = require("./query.routes");
const userRouter = require("./user.routes");


// use=
app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});


app.use('/query', queryRouter)
app.use('/user', userRouter) 

app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
