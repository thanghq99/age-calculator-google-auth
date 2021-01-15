var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// định nghĩ cấu trúc user model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});
// methods ======================
// phương thực sinh chuỗi hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// kiểm tra password có hợp lệ không
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);