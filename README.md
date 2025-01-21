# Automated GST Invoicing System API

## Project Overview

This project is a **REST API** built using **Node.js** and **Express** for managing **GST invoicing**. The API interacts with **Firebase Firestore** to store and manage bookings data. The main features include:

- Dynamic insertion of booking data via POST requests.
- Calculates GST (IGST and SGST) for each booking.
- Provides the ability to manage booking statuses and related data.

---

## Table of Contents
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [POST /file-gst](#post-file-gst)
- [Contributing](#contributing)
- [License](#license)

---

## Technologies

This project uses the following technologies:

- **Node.js**: JavaScript runtime environment for building the API.
- **Express.js**: Web framework for Node.js to create the REST API.
- **Firebase Admin SDK**: To interact with Firebase Firestore.
- **Postman**: Used for API testing.
- **GitHub**: Version control and repository management.

---

## Installation

### Step 1: Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/Priyanshu310502/Automated-GST-Invoicing-System-Development.git
cd Automated-GST-Invoicing-System-Development
## Installation

### Step 1: Install Dependencies

Install the necessary Node.js packages by running the following command:

```bash
npm install
# Usage

## Step 1: Set Up Firebase Service Account
1. Create a Firebase project and download the service account key file (`serviceAccountKey.json`).
2. Place the `serviceAccountKey.json` file in the root of the project directory.

## Step 2: Set Environment Variables
You need to set up the following environment variables for Firebase authentication:

- **`GOOGLE_APPLICATION_CREDENTIALS`**: Path to your Firebase service account key file.

### Example (Bash)
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
## Step 3: Start the Server
Run the Node.js server with the following command:

```bash
npm start
# API Endpoints

## POST /addBooking
This endpoint is used to add a new booking to the system.

### Request Body:
The request should include the following JSON structure:

```json
{
    "name": "John Doe",
    "totalAmount": 10000,
    "status": "Pending"
}
```

### Example Request:
```bash
curl -X POST http://localhost:3000/addBooking \  
-H "Content-Type: application/json" \  
-d '{
    "name": "John Doe",
    "totalAmount": 10000,
    "status": "Pending"
}'
```
![bookings Data](https://github.com/user-attachments/assets/c4955c95-8fe5-4a2f-8c91-ba4627662d9b)

![firebase store booking data](https://github.com/user-attachments/assets/3ea949e3-dd96-4ec6-a4c0-51768da94396)

### Response:
A successful request will return the following JSON structure:

```json
{
    "message": "Booking added successfully.",
    "documentId": "abc123xyz"
}
```
### PubSub trigger Updated Data
![firebase upadted data](https://github.com/user-attachments/assets/e08121bd-e3c7-4ada-8584-c1d40994ab92)
## Booking status Change after trigger pubSub event
![status update](https://github.com/user-attachments/assets/cabe21b7-8c46-43be-904b-b4ea02ef516a)

# Contributing

We welcome contributions to this project! If you have suggestions or improvements, please fork the repository and submit a pull request. Ensure you follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

---

# License

This project is licensed under the MIT License - see the LICENSE file for details.

---

# Acknowledgements

- **Firebase** for the Firestore database.
- **Express** for building the REST API.
- **Node.js** for the runtime environment.
- **Postman** for API testing.



