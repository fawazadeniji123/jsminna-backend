const { log } = console;

const fs = require('fs');
const http = require('http');

// task 1
/*
 create a module that accepts a file name as an input and deletes it 
 ( Assuming that the file is in the same directory as the module )
*/

const deleteFile = (filename) => {
	fs.unlink(filename, (err) => {
		if (err) log(err)
		log('The file has been deleted :)')
	})
}

// deleteFile('test.txt');

// task 2
/*
	create a module that reads a file and logs its content to the console.
*/

const logFileContent = (filename) => {
	fs.readFile(filename, (err, data) => {
		if (err) log(err)
		log('Logging content of the file now...')
		log(data.toString())
		log('(content ends here)')
	})
}

// logFileContent('file.txt');

// task 3
/*
	create a basic HTTP server that listens to a request on a certain port
	and echoes the body of the request (if its exists) as a response. The 
	server should listen to the following request; POST, PUT, DELETE
*/

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-type' : 'application/json' })

	if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') {
		let body;
		req.on('data', data => {
			body = data;
		})
		req.on('end', () => {
			res.end(body);
		})		
	}
})

server.listen(3001, '127.0.0.1', () => {
	log('Listening for request now...');
})

// task 4
/*
	remove the echo feature from the server and do the following
		given an array of state objects, each object in the array
		contains the name of a state as its key, and the capital
		as its value. i.e { lagos: 'ikeja' }. Hardcode this array
		of objects on the backend and do the following;
		a. A GET request made to the server should return the state
			array as a response.
		b. A POST request made to the server with the state object as
			the request body should add a new state-capital object to
			the array and return the newly updated object as a response.
		c. An PUT request made should update an existing capital of a 
			particular state and respond with the update object
		d. A DELETE request made should delete a particular state-capital 
			pair from the array and respond with the updated object
		e. Additionally, the body of each request should only contain 
			an object e.g { Osun: 'Osogbo' }
*/

// this is the array of state-capital objects
let states = [
	{ lagos: 'ikeja' },
	{ ondo: 'akure' },
	{ ogun: 'abeokuta' },
	{ osun: 'osogbo' },
	{ oyo: 'ibadan' }
]

const request = (req, res) => method => {
	let body;

	switch (method) {
		case 'GET':
			// for GET requests

			// JSON.stringify(states) turns the state array into JSON format 
			res.end(JSON.stringify(states));

			break;
		case 'POST':
			// for POST request

			// listens for data event	on the request object
			req.on('data', data => {
				// JSON.parse(data.toString()) parses the json string to object
				body = JSON.parse(data.toString());
			})
			// listens for end event on the request object
			req.on('end', () => {
				const key = Object.keys(body)[0];
				states.forEach(state => {
					if (Object.keys(state)[0] == key) {					
						res.writeHead(403)
						res.end()
					}
				})					
				states.push(body)
				res.writeHead(201)
				res.end(JSON.stringify(body));
			})

			break;
		case 'PUT':
			// for PUT requests

			req.on('data', data => {
				body = JSON.parse(data.toString());
			})
			req.on('end', () => {
				const key = Object.keys(body)[0];
				states.forEach(state => {
					if (Object.keys(state)[0] == key) {					
						state[key] = body[key]
					}
				})
				res.end(JSON.stringify(body));
			})
			break;
		case 'DELETE':
			// for DELETE requests

			req.on('data', data => {
				body = JSON.parse(data.toString());
			})
			req.on('end', () => {
				const key = Object.keys(body)[0];

				const index = states.findIndex(state => Object.keys(state)[0] == key)
				if (index != -1) {
					states.splice(index, 1)
					res.end(JSON.stringify(states))
				} else {
					res.writeHead(403)
					res.end()
				}
			})	
			break;
		default:
			res.writeHead(204);
			res.end()
			break;
	}
}

// NOTE: THIS SERVER USES 'JSON' FOR EXCHANGING DATA
const server2 = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-type' : 'application/json' })

	const serve = request(req, res);
	serve(req.method)

})

server2.listen(3000, '127.0.0.1', () => {
	log('Listening for request now...');
})

