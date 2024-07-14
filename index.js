const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); 
const loginRoute = require('./routes/authRoute')
const adminRoute = require('./routes/userRoutes')
const modalRouts = require('./routes/modalRoutes')

const app = express();
const port = process.env.PORT || 9000;

// app.use('/uploads', express.static('uploads'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(bodyParser.json());



app.use('/auth', loginRoute);
app.use('/admin' , adminRoute);
// app.use('/uploads', express.static('uploads'));
app.use('/modals', modalRouts);


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

