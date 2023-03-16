
// Calculator behaviour:
// It seems that most calculators use 0 as the default number if an operator is pressed before a number
// Division by zero is obviously not calculated and produces an Error, any other operation with Error results in... Error

// Calculator state
calculator = {
	main_display: "0",
	secondary_display: "",
	result: "0",
	operator: "",
	number: "",
}

// main_display - displays the current number of importance
// secondary_display - displays the last operation done (first_number operator second_number)(essentially a last_operation store)
// result - stores the last resut (as number OR Error)
// selected_operator - stores the currently selected operator (can be changed if no second_number is entered or will be used to calculate if second number is entered)
// number - stores the entered number


// Calculator UI functions


// Calculator UI event listeners
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
	key.addEventListener("click", (e) => {
		const keyID = e.target.id;
		
		// Handle the number keys
		if (key.classList.contains("number")) {
			const number = keyID.slice(-1);
			if (calculator.operator === "") {
				calculator.result += number;
			}
			else {
				calculator.number += number;
			}
		}

		// Helper function to handle the operator keys
		function getOperatorFromId(id) {
			if (id === "add") return "+";
			if (id === "subtract") return "-";
			if (id === "dividey") return "/";
			if (id === "multiply") return "*";
		}
		
		// Handle the operator keys
		if (key.classList.contains("operator")) {
			// Should we update the operator OR should we evaluate and then have a new result and select our new operator?
			// If we have a number (secondary number) and we press any operator it signifies we need to evalutate
			if (calculator.number !== "") {
				// Evaluate, then select new operator
				console.log("Evaluating...")

				// After we have evaluated - thus set our new result, cleared number and cleared the operator
				// We can set our new operator
				const operator = getOperatorFromId(keyID.slice(11));
				calculator.operator = operator;
			}
			else {
				// Update the currently selected operator state
				const operator = getOperatorFromId(keyID.slice(11));
				calculator.operator = operator;
			}
		}
		
		// Handle the period key
		if (keyID === "calculator-period") {
			if (calculator.operator === "" && !calculator.result.includes(".")) {
				calculator.result += ".";
			}
			if (calculator.operator !== "" && !calculator.number.includes(".")) {
				calculator.number += ".";
			}
		}

		console.log(calculator);

		// If the key is an operator and we have a current_operator
		// We want to simply replace that operator, however, if previous number is 0 we cannot allow the division operator (for example)
		// Also, what should we assume the number is? Starts with 0 unless a number is entered? Are there any best practices/patterns?
		// Then, should we allow operators such as multiplication or not?

		// If the class of the e.target.id contains number (it is a number key)
		// We shall continue concatinating it to our current number unless there is an operator selected
		// If there is an operator selected we are building our second numberd
		
		// If the key equals is pressed, we shall use the operate function
		// However, what happens if we lack one or more numbers - and/or the operator?
		// Should we perhaps let it calculate "NaN"?
		
		// How should we deal with decimal numbers?
		// If the current number we are building contains one decimal we should not allow adding another one
		// Perhaps the button should be disabled, however, we still neeed this double checking in the logic
		
		// The backspace button should remove the last entered digit from currently building number when pressed
		// If we have a current operator but have not started building our second number yet, we should remove the operator 
		// Once the operator is removed we either start removing from the first number or we can choose to start building that number again
		// (maybe you accidentally pressed an operator button)

		// The clear button should just reset everything to the defaults found in the calculator object (hard-coded) 


		
	})
})



// Calculator logic functions
function operate(operator, x, y) {
	let result = null;
	if (operator === "+") result = addNumbers(x,y);
	if (operator === "-") result = subtractNumbers(x,y);
	if (operator === "*") result = multiplyNumbers(x,y);
	if (operator === "/") result = divideNumber(x,y);
	return result;
}


// Math functions
function addNumbers(...numbers) {
	return numbers.reduce((total, number) => {
		return total + number;
	})
}


function subtractNumbers(...numbers) {
	return numbers.reduce((total, number) => {
		return total - number;
	})	
}


function multiplyNumbers(...numbers) {
	return numbers.reduce((total, number) => {
		return total * number;
	})
}


function divideNumber(numerator, denominator) {
	return numerator / denominator;
}
