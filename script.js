
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
	lastExpression: "",
}

// main_display - displays the current number of importance
// secondary_display - displays the last operation done (first_number operator second_number)(essentially a last_operation store)
// result - stores the last resut (as number OR Error)
// selected_operator - stores the currently selected operator (can be changed if no second_number is entered or will be used to calculate if second number is entered)
// number - stores the entered number


// Calculator UI functions
function updateSecondaryDisplay(calculator) {
	const secondaryDisplay = document.querySelector("#calculator-secondary-display");
	if (calculator.operator !== "") {
		secondaryDisplay.textContent = calculator.result;
	}
	else if (calculator.number !== "") {
		secondaryDisplay.textContent = `${calculator.result} ${calculator.operator}`;
	}
	else {
		secondaryDisplay.textContent = "";
	}
	if (calculator.lastExpression !== "") {
		secondaryDisplay.textContent = calculator.lastExpression;
	}
	// Display result if operator
	// Display result and operator if number
}

function updatePrimaryDisplay(calculator) {
	const primaryDisplay = document.querySelector("#calculator-primary-display");
	if (calculator.number !== "") {
		// Set primary display to calculator number
		primaryDisplay.textContent = calculator.number;
	}
	else if (calculator.operator !== "") {
		// Set primary display to operator
		primaryDisplay.textContent = calculator.operator;
	}
	else {
		// Set primary display to result
		primaryDisplay.textContent = calculator.result;
	}
	if (calculator.lastExpression !== "") {
		primaryDisplay.textContent = calculator.result;
	}
	// Display result if nothing else 
	// Display operator if exists
	// Display number if exists 
}


// Calculator UI event listeners
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
	key.addEventListener("click", (e) => {
		const keyID = e.target.id;
		
		// Handle the number keys
		// The easiest way to remove zeros from a number is by using parseFloat
		if (key.classList.contains("number")) {
			const number = keyID.slice(-1);
			
			if (calculator.operator === "") {
				calculator.result = String(parseFloat(calculator.result += number));
			}
			else {
				calculator.number = String(parseFloat(calculator.number += number));
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
			// If we have two numbers (result and number) we should eval on any operator press (since we have one already)
			if (calculator.number !== "") {
				let result = String(operate(calculator.operator, calculator.result, calculator.number));
				calculator.result = result;
				calculator.number = "";
				// The operator is updated within the parent if-statement
			}

			// Update the currently selected operator state
			const operator = getOperatorFromId(keyID.slice(11));
			calculator.operator = operator;
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

		// Handle the equals key
		if (keyID === "calculator-equals") {
			if (calculator.number !== "") {
				// We can do our expresion calculation
				let result = String(operate(calculator.operator, calculator.result, calculator.number));
				calculator.lastExpression = `${calculator.result} ${calculator.operator} ${calculator.number}`;
				calculator.result = result;
				calculator.number = "";
				calculator.operator = "";
			}
			if (calculator.operator !== "") {
				// If we have an operator but no second number
				// Use the result as second number
				let result = String(operate(calculator.operator, calculator.result, calculator.result));
				calculator.result = result;
				calculator.number = "";
				// We do not reset the operator or lastExpresion
			}
			// Otherwise the result remains the reslult and we don't have to do anything
		}

		// Handle the clear key
		if (keyID === "calculator-clear") {
			// Reset the calculator state
			calculator = {
				main_display: "0",
				secondary_display: "",
				result: "0",
				operator: "",
				number: "",
				lastExpression: "",
			}	
		}

		// Handle the backspace key
		if (keyID === "calculator-backspace") {
			if (calculator.number !== "") {
				calculator.number = calculator.number.slice(0, calculator.number.length - 1);
			}
			else if (calculator.operator !== "") {
				calculator.operator = "";
			}
			else if (calculator.result.length > 1) {
				calculator.result = calculator.result.slice(0, calculator.result.length - 1);
			}
			else {
				calculator.result = "0";
			}
		}

		// Fix any JS floats that are long for no reason (so it looks nice before displaying)


		// Display new calculator state
		updatePrimaryDisplay(calculator);
		updateSecondaryDisplay(calculator);
		console.log(calculator);

		// Reset lastExpression after displaying
		calculator.lastExpression = "";
	})
})


// On page load - display default calculator state



// Calculator logic functions
function operate(operator, x, y) {
	x = parseFloat(x);
	y = parseFloat(y);
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
