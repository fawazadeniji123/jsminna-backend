// question 1
// write a short article explaining one of the things you learned this week.
/*
	One of the things I learnd this week is REST API
	REST API - this is a defined set of function which developers can
	perform requests and recieve reponses via HTTP protocol. some basic
	operations are GET, POST, PUT, DELETE.
	GET    - is used to recieve a resource from the server
	POST   - is used to create a resource on the server
	PUT    - is used to change state or update a resource on the server
	DELETE - is used to remove a resource on the server

	Further explanation  - a web server perharps doesn't follow the rules set by a web 
	browser. With REST API we're able to create an API that is RESTful - something that
	follows the rules that everybody can agree on so that wew have compatyibility between
	different systems.

	So a REST API is a way to define the servers so that it specifies what it can provide
	and how to use it.

	REST APIs are stateless meaning calls(requests) can be made independently of one another
	and each call contains all the data needed to complete itself succesfully.
	
	In other words, a server doesn't need to keep memorizing things. Each request that comes
	in has enough information that the server can respond with, rewgardless of who made the
	request.
*/

// question 2
// write a module that takes in an input string and
// checks if its a palindrome (i.e return true if it is and return false otherwise)

const palindrome = (word) => {
	if (word.toLowerCase() == word.toLowerCase().split('').reverse().join('')) {
		return true;
	}
	return false;
}

module.exports.palindrome = palindrome;
