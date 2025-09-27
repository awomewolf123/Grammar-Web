# Grammar AI - Web-based Grammar Checker

A Grammarly-like web application that uses AI to check grammar, spelling, punctuation, and writing style.

## Features

- ✅ Real-time AI-powered grammar checking
- ✅ Spelling and punctuation correction
- ✅ Writing style improvements
- ✅ Professional UI with detailed feedback
- ✅ Score-based evaluation
- ✅ Powered by Groq AI (fast and cost-effective)

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **AI Service**: Groq API with Llama 3.1 model
- **Styling**: Modern CSS with responsive design

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Groq API key (free at [console.groq.com](https://console.groq.com/keys))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/awomewolf123/Grammar-Web.git
   cd Grammar-Web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and go to: `http://localhost:3000`

## Usage

1. Enter text in the textarea
2. Click "Check Grammar"
3. Review the AI-generated feedback including:
   - Grammar corrections
   - Spelling fixes
   - Style improvements
   - Overall writing score

## API Endpoints

- `GET /` - Serves the main application
- `POST /api/check-grammar` - Analyzes text and returns corrections
- `GET /api/health` - Health check endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Powered by [Groq](https://groq.com/) for fast AI inference
- Built with modern web technologies
- Inspired by tools like Grammarly