var mongoose = require('mongoose');
 
var nguoidung = new mongoose.Schema(
{ 
    cat:'string',
    title: 'string', 
    info: 'string',
    anhsp:'string',
    price:Number,
    discount:Number
}
,{collection:'nguoidung'});

module.exports = mongoose.model('nguoidung', nguoidung);