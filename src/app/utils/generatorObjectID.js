var mongoose = require('mongoose');
// var id = mongoose.Types.ObjectId();
export const genObjectID = () => mongoose.Types.ObjectId().toString();