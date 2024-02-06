# Quick Quiz

Quick Quiz is a web application for creating and taking quizzes online. It allows users to easily create quizzes, share them with others, and take quizzes created by others.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Quiz Creation**: Logged-in users can create quizzes with multiple-choice questions.
- **Quiz Taking**: Users can take quizzes created by themselves or others.
- **Quiz Results**: After completing a quiz, users can see their results and correct answers.
- **Quiz Sharing**: Users can share quizzes with others via unique URLs.
- **Admin Dashboard**: Admin users have access to a dashboard to manage quizzes and users.

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, Bootstrap
- **API Integration**: Axios
- **Deployment**: Render (Backend), Netlify (Frontend)

## Setup Instructions

To run the Quick Quiz project locally, follow these steps:

1. Clone the repository:

```
git clone <repository-url>
```

2. Navigate to the project directory:

```
cd quick-quiz
```

3. Install dependencies for both frontend and backend:

```
cd frontend
npm install
cd ../backend
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables:

   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

5. Run the backend server:

```
npm start
```

6. Run the frontend development server:

```
cd ../frontend
npm start
```

7. Open your web browser and navigate to `http://localhost:3000` to view the Quick Quiz application.

## Demo

You can try out the Quick Quiz application live at [Demo Link]()

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please email us at [email@example.com](mailto:email@example.com).

