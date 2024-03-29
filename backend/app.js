const createError = require('http-errors');
const express = require('express'); //익스프레스 불러오기
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({limit: '5000mb'}));
app.use(express.urlencoded({ limit: '5000mb', extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const feedRouter = require('./routes/feed');
const profileRouter = require('./routes/profile');
const commentRouter = require('./routes/comments');
const likesRouter = require('./routes/likes');
const followRouter = require('./routes/follow');

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/signUp', usersRouter);
app.use('/api/users/login', usersRouter);
app.use('/api/feed', feedRouter);
app.use('/api/feed/post', feedRouter);
app.use('/api/feed/profile', feedRouter);
app.use('/api/feed/delete', feedRouter);
app.use('/api/profile', profileRouter);
app.use('/api/profile/self', profileRouter);
app.use('/api/comments', commentRouter);
app.use('/api/comments/inquiry', commentRouter);
app.use('/api/comments/delete', commentRouter);
app.use('/api/likes', likesRouter);
app.use('/api/likes/addLike', likesRouter);
app.use('/api/likes/deleteLike', likesRouter);
app.use('/api/follow', followRouter);
app.use('/api/follow/follow', followRouter);
app.use('/api/follow/unfollow', followRouter);

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

// 터미널에 남아있는 포트 지우기 lsof -ti :3000 / kill -9 PID 값
// app.listen(3000)

module.exports = app;
