var mongoose = require('mongoose');
 
var danhsach = new mongoose.Schema(
{ 
    cat:'string',
    title: 'string', 
    info: 'string',
    anhsp:'string',
    price:Number,
    discount:Number
}
,{collection:'danhsach'});

module.exports = mongoose.model('danhsach', danhsach);