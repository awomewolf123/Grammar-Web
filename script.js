document.getElementById('checkBtn').addEventListener('click', async function() {
	const input = document.getElementById('inputText').value.trim();
	const resultDiv = document.getElementById('result');
	const checkBtn = document.getElementById('checkBtn');
	
	if (!input) {
		resultDiv.textContent = 'Please enter some text to check.';
		resultDiv.style.color = '#e53e3e';
		return;
	}

	// Show loading state
	checkBtn.textContent = 'Checking...';
	checkBtn.disabled = true;
	resultDiv.innerHTML = '<div class="loading">Analyzing your text...</div>';

	try {
		const response = await fetch('/api/check-grammar', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: input })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		displayResults(data);

	} catch (error) {
		console.error('Error checking grammar:', error);
		resultDiv.innerHTML = `
			<div class="error">
				<h3>❌ Error</h3>
				<p>Failed to check grammar. Please make sure the server is running.</p>
				<p><small>Error: ${error.message}</small></p>
			</div>
		`;
	} finally {
		// Reset button state
		checkBtn.textContent = 'Check Grammar';
		checkBtn.disabled = false;
	}
});

function displayResults(data) {
	const resultDiv = document.getElementById('result');
	
	if (data.issues && data.issues.length > 0) {
		let html = `
			<div class="results-header">
				<h3>✅ Grammar Check Complete</h3>
				<div class="score">Score: ${data.score || 'N/A'}/100</div>
			</div>
			<div class="summary">
				<p><strong>Summary:</strong> ${data.summary || 'Analysis completed'}</p>
			</div>
		`;

		if (data.correctedText && data.correctedText !== document.getElementById('inputText').value.trim()) {
			html += `
				<div class="corrected-text">
					<h4>📝 Corrected Text:</h4>
					<p class="corrected">${data.correctedText}</p>
				</div>
			`;
		}

		html += '<div class="issues"><h4>🔍 Issues Found:</h4>';
		
		data.issues.forEach((issue, index) => {
			html += `
				<div class="issue">
					<div class="issue-header">
						<span class="issue-type">${issue.type}</span>
						<span class="issue-number">#${index + 1}</span>
					</div>
					<p><strong>Original:</strong> "${issue.original}"</p>
					<p><strong>Correction:</strong> "${issue.correction}"</p>
					<p><strong>Explanation:</strong> ${issue.explanation}</p>
				</div>
			`;
		});
		
		html += '</div>';
		resultDiv.innerHTML = html;
	} else {
		resultDiv.innerHTML = `
			<div class="success">
				<h3>✅ Great Job!</h3>
				<div class="score">Score: ${data.score || 100}/100</div>
				<p>No grammar issues found in your text!</p>
			</div>
		`;
	}
}
