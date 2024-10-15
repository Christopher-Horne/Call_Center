import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import userRoutes from './routes/user.routes.js';
import customerRoutes from './routes/customer.routes.js';
import cookieParser from 'cookie-parser';

// Connect to the database
dbConnect();

// Create an instance of the express application
const app = express();

// Use CORS middleware to enable cross-origin requests
//app.use(cors());

// Parse JSON requests
app.use(express.json(), cors({origin:'http://localhost:5173', credentials:true}))  // Middleware to use json in the request body and cors

// Used for handeling api routes with the router middleware
app.use('/api', userRoutes)
app.use('/api/customers', customerRoutes)

app.use(cookieParser(process.env.SECRET_KEY))

// load enviorment variables from .env file
dotenv.config();

// Start the server and lisen on specific port 
const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);
