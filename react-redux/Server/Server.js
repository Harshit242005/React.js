/* eslint-disable no-undef */
// script to handle the server side coding issues 
// script.js

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
// Middleware
app.use(cors());
const payloadSizeLimit = '10mb';

// Use bodyParser with payload size limit
app.use(bodyParser.json({ limit: payloadSizeLimit }));
const port = 3000;

// Signup route
app.post('/Signup', async (req, res) => {
    const client = await MongoClient.connect('mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/')
    const db = client.db('State');
    // MongoDB Collection
    const userCollection = db.collection('Users');
   
    const { profileImage, username, password,  } = req.body;
    console.log('username is: ', username);
    console.log('password', password);

    // Convert the image to base64
    const imageBase64 = profileImage ? profileImage.toString('base64') : null;
    console.log('image base64 data is: ', imageBase64);

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user document
    const newUser = {
        'Username': username,
        'Password': hashedPassword, 
        'Image': imageBase64,
    };

    try {
        // Save the user to the collection
        await userCollection.insertOne(newUser);

        // Send success response
        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/Login', async (req, res) => {
    const client = await MongoClient.connect('mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/')
    const db = client.db('State');
    // MongoDB Collection
    const userCollection = db.collection('Users');
    const { username, password } = req.body;

    try {
        // Find the user with the provided username
        const user = await userCollection.findOne({ 'Username': username });

        if (user) {
            // Compare the stored hashed password with the provided password
            const passwordMatch = await bcrypt.compare(password, user.Password);

            if (passwordMatch) {
                // Passwords match, send the user document as the respon
                console.log('login successful');
                res.status(200).json({ user });
            } else {
                // Passwords don't match
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            // User not found
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle errors
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});