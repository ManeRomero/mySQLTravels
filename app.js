var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbars = require('express-handlebars')
const override = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

var indexRouter = require('./routes/index');
var travelsRouter = require('./routes/travels');
const userRouter = require('./routes/user')

var app = express();

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbars({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: {
      puntito: function (price) {
        return (Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(price))
      }
  }
}))
app.set('view engine', '.hbs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(override('_method'))

app.use(session({
  name: 'userSession',
  secret: 'myS3cr3tK3y',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60*1000}
}))

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

app.use('/', indexRouter);
app.use('/travels', travelsRouter);
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;