var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // kết nối tới db
require('./config/passport')(passport); // pass passport for configuration
// cài đặt ứng dùng express
app.use(morgan('dev')); // log tất cả request ra console log
app.use(cookieParser()); // đọc cookie (cần cho xác thực)
app.use(bodyParser()); // lấy thông tin từ html forms
app.set('view engine', 'ejs'); // cài đặt ejs là templating
// các cài đặt cần thiết cho passport
app.use(session({secret: 'ilovescodetheworld'})); // chuối bí mật đã mã hóa coookie
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// routes ======================================================================
require('./app/routes.js')(app, passport); // Load routes truyền vào app và passport đã config ở trên
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);