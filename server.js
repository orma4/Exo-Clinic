const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
var cors = require('cors');
const bodyParser = require('body-parser');
var xss = require("xss");
require('dotenv/config')

const app = express();

//Bodyparser middleware
app.use(express.json());

// aws upload
app.use(fileUpload());

//DB config

const db=  process.env.MONGODB_URI || config.get('mongoURI');
console.log(db)
//Connect to mongo
mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useCreateIndex: true, useUnifiedTopology: true ,  useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.log(err));

//use routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/doctors', require('./routes/api/doctors'));
app.use('/api/appointments', require('./routes/api/appointments'));
app.use('/api/uploads', require('./routes/api/uploads'));




var server = http.createServer(app)
var io = require('socket.io')(server)

app.use(cors())
app.use(bodyParser.json())


if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(
         __dirname,'client','build', 'index.html') 
        );
    });
}


sanitizeString = (str) => {
	return xss(str)
}

connections = {}
messages = {}
timeOnline = {}



io.on('connection', (socket) => {

	socket.on('join-call', (path) => {
		if(connections[path] === undefined){
			connections[path] = []
		}
		connections[path].push(socket.id)

		timeOnline[socket.id] = new Date()

		for(let a = 0; a < connections[path].length; ++a){
			io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
		}

		if(messages[path] !== undefined){
			for(let a = 0; a < messages[path].length; ++a){
				io.to(socket.id).emit("chat-message", messages[path][a]['data'], 
					messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
			}
		}

		console.log(path, connections[path])
	})

	socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message)
	})

	socket.on('chat-message', (data, sender) => {
		data = sanitizeString(data)
		sender = sanitizeString(sender)

		var key
		var ok = false
		for (const [k, v] of Object.entries(connections)) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k
					ok = true
				}
			}
		}

		if(ok === true){
			if(messages[key] === undefined){
				messages[key] = []
			}
			messages[key].push({"sender": sender, "data": data, "socket-id-sender": socket.id})
			console.log("message", key, ":", sender, data)

			for(let a = 0; a < connections[key].length; ++a){
				io.to(connections[key][a]).emit("chat-message", data, sender, socket.id)
			}
		}
	})

	socket.on('disconnect', () => {
		var diffTime = Math.abs(timeOnline[socket.id] - new Date())
		var key
		for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k

					for(let a = 0; a < connections[key].length; ++a){
						io.to(connections[key][a]).emit("user-left", socket.id)
					}
			
					var index = connections[key].indexOf(socket.id)
					connections[key].splice(index, 1)

					console.log(key, socket.id, Math.ceil(diffTime / 1000))

					if(connections[key].length === 0){
						delete connections[key]
					}
				}
			}
		}
	})
})


port = process.env.PORT || 5000;

server.listen(port, () => console.log(`server started on port ${port}`));