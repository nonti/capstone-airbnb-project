const  express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const authRouter =  require('./routes/auth.route');
const accomodationRouter = require('./routes/accomodation.routes');
const reservationRouter = require('./routes/reservation.routes');
const path = require('path');

//MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

//ROUTES
app.use('/api/auth', authRouter);
app.use('/api/accommodations', accomodationRouter);
app.use('/api/reservations', reservationRouter);

//DATABSE CONNECTION
connectDB();

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

//SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
