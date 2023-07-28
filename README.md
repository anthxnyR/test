# Running the Program Locally

This guide will explain how to run the program locally, which consists of a frontend and a backend. The backend is responsible for providing the API, and the frontend is the user interface that interacts with the API.

## Prerequisites
- Node.js and npm are installed on your machine.

## Backend Setup
1. Open a terminal or command prompt.
2. Navigate to the `backend` folder.
3. Install the required dependencies by running the following command:
```npm install```
4. Once the installation is complete, start the backend server by running:
```npm run```

This will launch the backend API server on port 3000.

## Frontend Setup
1. Open another terminal or command prompt.
2. Navigate to the `frontend` folder.
3. Install the required dependencies by running the following command:
```npm install```
4. After the installation, start the frontend application with:
```npm start```

Make sure the frontend application can be accessible at `http://localhost:3001` in your web browser.

## Usage
Once both the backend and frontend are running, you can access the application in your web browser at `http://localhost:3001`. The frontend provides a user interface with the following features:

1. View Client List: Displays a list of clients with their names, last names, profile images and IDs.
2. Check Specific Client: Allows you to search for a specific client by their ID. The application will fetch the client's information from the API and display their name, last name, gender, email, and profile image.
3. Add Client: Provides a form to add a new client. You need to fill in the first name, last name, email, gender, and image URL. If you select "Other" for gender, you can specify a custom gender.

