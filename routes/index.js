const Express = require('express');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');
const { userIsAdminMDW, regularUserMDW } = require('../middleware/auth.mdw')
const app = Express();

// Rutas
const queryRouter = require("./query.routes");
const userRouter = require("./user.routes");
const courseRouter = require("./course.routes");
const authRouter = require("./auth.routes");
const adminRouter = require("./admin.routes");



// use=
app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});


app.use('/query', queryRouter)
app.use('/user', regularUserMDW, userRouter)
app.use('/course', courseRouter)
app.use('/auth', authRouter)
app.use('/admin', userIsAdminMDW,adminRouter)


app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
