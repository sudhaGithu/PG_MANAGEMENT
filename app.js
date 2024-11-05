const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const port = process.env.PORT



const adminRoutes = require('./Routes/adminRoutes')
const ownerRoutes = require('./Routes/ownerRoutes');


// Use CORS middleware with custom options
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/uploads', express.static('uploads')); 


app.use(express.json());



// Routes
app.use('/api/v1', adminRoutes);
app.use('/api', ownerRoutes);



async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB successfully');

        // Run the setup function
        //await setupInitialData();
        
        // Start the server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error during startup:', err);
        process.exit(1); // Exit with failure
    }
}

// Start the server
startServer();