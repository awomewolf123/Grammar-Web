document.getElementById('checkBtn').addEventListener('click', function() {
	const input = document.getElementById('inputText').value.trim();
	const resultDiv = document.getElementById('result');
	if (!input) {
		resultDiv.textContent = 'Please enter some text to check.';
		resultDiv.style.color = '#e53e3e';
		return;
	}
	// Placeholder for AI grammar check
	resultDiv.textContent = 'didnt work on the backend yet';
	resultDiv.style.color = '#2d3748';
});
