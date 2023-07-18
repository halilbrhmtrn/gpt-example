# How to guide

This is a demonstration showcasing the effectiveness of 'text-davinci-003' in simulating Turkish appointment requests using NLP. The service operates on port 3000, supports concurrent HTTP connections, and offers a single endpoint: /extract-intent.

## Requirements

* Node.js (version 12 or above)
* npm (Node Package Manager)

## Installation

1. Clone the repository:
```
git clone https://github.com/halilbrhmtrn/gpt-example.git
```
2. Navigate to the project directory:
```
cd gpt-example
```
3. Install the dependencies:

```
npm install

```

## Usage

1. Start the server:

```
npm run start
```

2. The server will now be running and listening on port 3000.

### Submitting a Message
To submit a message to the server, make a POST request to the /extract-intent endpoint. You should provide the message in the request body as JSON data with the message.

Example using cURL:

```
curl -X POST -H "Content-Type: application/json" -d "{\"message\": \"Ağustosun son haftası herhangi bir gün öğleden sonra 3'te müsait misiniz?\"}" http://localhost:3000/extract-intent

```

### Running tests
Run example test cases by:

```
npm run test
```

## Author

- [@halilbrhmtrn](https://www.github.com/halilbrhmtrn)