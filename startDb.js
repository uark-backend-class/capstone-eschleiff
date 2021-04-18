const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connection.on('open', () => {
    console.log(`Now connected to mongoDB cluster.`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Now listening on port ${process.env.PORT}.`);
})
