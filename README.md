# Timestamp Microservice

A simple Node.js microservice that returns timestamps in both UNIX and UTC formats.

## About

This project was built using the **boilerplate code** from the **Timestamp Microservice** project in the freeCodeCamp course **“Back End Development and APIs.”**

The service provides an API endpoint that returns the current time or a formatted timestamp based on user input.

## Usage

### API Endpoint - Examples

| Request | Response |
|----------|-----------|
| `/api/2015-12-25` | `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }` |
| `/api/1451001600000` | `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }` |
| `/api` | `{ "unix": 1697984050000, "utc": "Wed, 22 Oct 2025 14:34:10 GMT" }` |
| `/api/invalid-date` | `{ "error": "Invalid Date" }` |

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/timestamp-microservice.git

# Enter the project directory
cd timestamp-microservice

# Install dependencies
npm install

# Run the server
npm start