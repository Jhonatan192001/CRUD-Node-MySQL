const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const customRoutes = require('./routes/customer');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'Jhonatan120301',
    port: 3306,
    database: 'usuarios'
}, 'single'));
app.use(express.urlencoded({ extended: false}));

//routes
app.use('/', customRoutes);

//static fields
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('listening on port 3000');
});

//start server
// export default app;
