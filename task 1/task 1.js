// question 1
// write an article about one thing you learned in NodeJs
/*
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
