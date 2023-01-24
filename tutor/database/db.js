const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/xlist',
{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
const xSchema = mongoose.Schema ({

})
const x = mongoose.model('x', xSchema)
