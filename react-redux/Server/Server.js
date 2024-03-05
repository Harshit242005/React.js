/* eslint-disable no-undef */
// script to handle the server side coding issues 
// script.js

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});
// Middleware
app.use(cors());
const payloadSizeLimit = '10mb';

// Use bodyParser with payload size limit
app.use(bodyParser.json({ limit: payloadSizeLimit }));
const port = 3001;


// WebSocket handling [ it should be map so we can map the user object id from the database to the generated id from the connection time ]
// change this for the structure of the user id in a map
const activeConnections = new Map();
const activeRooms = new Map();

io.on('connection', (socket) => {
  console.log('New user connected with the socket id: ', socket.id);

  socket.on('login', (socketId, userId) => {
    console.log(`User socket id is ${socketId} ${userId} logged in`);

    // Check if the socket.id is already in the Map
    if (!activeConnections.has(socketId)) {
      // If not, create a new list for that socket.id
      activeConnections.set(socketId, []);
    }

    // Add userId to the list associated with the socket.id
    const userList = activeConnections.get(socketId);
    userList.push(userId);
    userList.push('Active');

    console.log(activeConnections);

    // Emit the entire Map to all connected clients
    io.emit('activeUsers', Array.from(activeConnections));
  });

  // listen for the change state and change the state at the 1 index of the accepted id 
  socket.on('changeState', (socketId, state) => {
    console.log(`socket id is: ${socketId} and the state is: ${state}`);
    if (activeConnections.has(socketId)) {
      const userList = activeConnections.get(socketId);
      userList[1] = state;
      console.log(activeConnections);
      io.emit('activeUsers', Array.from(activeConnections));
    }
  });


  // listen for the room creation
  socket.on('createRoom', (socketId, roomName) => {
    console.log(`socket id name is: ${socketId} and root name is: ${roomName}`);

    if (activeRooms.has(roomName)) {
      socket.emit('error_on_creating_room', "There is already a room with this name! try another name");
    }
    else {
      activeRooms.set(roomName, []);
      console.log(activeRooms);
      // get the list and add value in that list
      const room_list = activeRooms.get(roomName);
      room_list.push(socketId);
      room_list.push([]);
      console.log(activeRooms);
      // here should be conditions added in the adding of the created room name as the user data
      // add the name in the end of the active connection
      const user_data = activeConnections.get(socketId)
      user_data.push(roomName);
    }

    socket.emit('createdRoom', roomName);

  });

  socket.on('remove_room', (socketId, roomName) => {
    console.log('removing room');
    console.log(socketId, roomName);

    if (activeRooms.has(roomName)) {
      // remove the room
      // get the member list first 
      const member_list = activeRooms.get(roomName)[1];
      console.log(`member list is: ${member_list}`);


      activeRooms.delete(roomName);
      socket.emit('deleted_room', 'Room has been deleted successfully');
      console.log('room has been deleted successfully');

      // add the name in the array of the active connections
      const user_data_list = activeConnections.get(socketId);
      user_data_list.pop();

    }
    else {
      console.log('room does not exist for deleting');
    }
  });

  socket.on('leave_room', (socketId, roomName) => {
    console.log('leaving room');
    console.log(socketId, roomName);

    if (activeRooms.has(roomName)) {
      // leave the user
      const member_list = activeRooms.get(roomName);

      // Check if the socketId exists in the member list
      const index = member_list[1].indexOf(socketId);
      if (index !== -1) {
        // Remove the socketId from the member list
        member_list[1].splice(index, 1);
        socket.emit('members', Array.from(member_list));
        console.log(`User with socketId ${socketId} left the room ${roomName}`);
        // send an emit to get know that user has got the connect value
        socket.emit('leaved_room', 'You have leaved the room successfully');
        // add the name in the array of the active connections
        const user_data_list = activeConnections.get(socketId);
        user_data_list.pop();
      } else {
        console.log('socketId does not exist in the member list');
      }
    } else {
      console.log('room does not exist for deleting');
    }
  });


  // join the room 
  socket.on('joining_room', (room_name, socketId) => {
    console.log(`room name is: ${room_name} and socket id is: ${socketId}`);
    if (activeRooms.has(room_name)) {
      // room exist in the active rooms names 
      const member_list = activeRooms.get(room_name);
      member_list[1].push(socketId);

      const creater_of_room = activeRooms.get(room_name)[0];
      // add the name in the array of the active connections
      const user_data_list = activeConnections.get(socketId);
      user_data_list.push(room_name);
      console.log(`creater of the room is: ${creater_of_room}`);
      // getting the members 
      const members = member_list[1];
      members.push(creater_of_room);
      console.log(`members are: ${members}`);
      socket.emit('joined_room', room_name);

      // sending the current new joined members in the socket reponse to update the UI
      const activeConnectionsObj = {};
      for (const [key, value] of activeConnections) {
        activeConnectionsObj[key] = value;
      }

      console.log(`current members are: ${members} and connections: ${activeConnectionsObj}`);
      console.log(activeConnections);
      console.log(activeRooms);

      
      io.emit('members', Array.from(members), activeConnectionsObj);
      
    }
    else {
      socket.emit('error_joining_room', 'Error joining errom! Room does not exist');
    }
  });


  // You may want to handle disconnection to remove the socket.id from the Map
  socket.on('disconnect', () => {
    console.log('User disconnected with the socket id: ', socket.id);

    // Remove the socket.id and associated list from the Map
    activeConnections.delete(socket.id);

    console.log(activeConnections);

    // Emit the updated Map to all connected clients
    io.emit('activeUsers', Array.from(activeConnections));
  });
});


// Signup route
app.post('/Signup', async (req, res) => {
  const client = await MongoClient.connect('mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/')
  const db = client.db('State');
  // MongoDB Collection
  const userCollection = db.collection('Users');

  const { profileImage, username, password, } = req.body;
  console.log('username is: ', username);
  console.log('password', password);

  // Convert the image to base64
  const imageBase64 = profileImage ? profileImage.toString('base64') : null;
  //console.log('image base64 data is: ', imageBase64);

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
        // get the object id and make it string and pass it in the websocket for login 
        //socket.emit('login', user._id.toString());
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


// defining an endpoint for handling the user id and sending data back from the database
app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(`Getting user data for: ${userId} and ${typeof userId}`);

  const client = await MongoClient.connect('mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/')
  const db = client.db('State');
  // MongoDB Collection
  const userCollection = db.collection('Users');

  try {
    // Find the user document with the given userId
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (user) {
      console.log('user found');
      // Extract Username and Image from the user document
      const { Username, Image } = user;

      // Send the extracted data to the frontend
      res.json([ Username, Image ]);
    } else {
      console.log('user not found');
      // User not found
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the MongoDB connection
    client.close();
  }
});



// http server listening endpoint
httpServer.listen(3000);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});