const Express = require('express');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

const app = Express();

// Rutas
const queryRouter = require("./query.routes");
const userRouter = require("./user.routes");
const courseRouter = require("./course.routes");
const authRouter = require("./auth.routes");



// use=
app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});


app.use('/query', queryRouter)
app.use('/user', userRouter)
app.use('/course', courseRouter)
app.use('/auth', authRouter)


app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
