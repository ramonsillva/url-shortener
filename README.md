# URL Shortener

This project is a URL shortener built with Node.js, using Express for the backend and Tailwind CSS for the frontend. The goal is to allow users to shorten long URLs and retrieve them easily.

## Project Structure

```
url-shortener
├── src
│   ├── server.js          # Application entry point
│   ├── app.js             # Express application configuration
│   ├── routes
│   │   └── urls.js        # Routes for URL shortening
│   ├── controllers
│   │   └── urlController.js # Controller to manage URLs
│   ├── services
│   │   └── urlService.js   # Business logic for shortening URLs
│   ├── models
│   │   └── urlModel.js     # Data model for URLs
│   └── db
│       ├── index.js        # Database connection setup
│       └── prisma
│           └── schema.prisma # Database schema
├── public
│   ├── index.html          # Main HTML page
│   ├── index.js            # Frontend JavaScript for UI interactions
│   └── css
│       └── styles.css      # Styles using Tailwind
├── prisma
│   └── migrations          # Database migrations
├── .env.example            # Example environment variables
├── package.json            # Npm configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd url-shortener
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Rename `.env.example` to `.env` and fill in your database credentials.

4. Run Prisma migrations:
   ```
   npx prisma migrate dev
   ```

5. Start the server:
   ```
   npm start
   ```

## Usage

- Open the application at `http://localhost:3000`.
- Enter a long URL in the input field and click "Shorten URL" to receive a shortened link.
- Use the returned shortened link to be redirected to the original URL.
