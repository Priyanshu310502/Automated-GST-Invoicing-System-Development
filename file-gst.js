// Import necessary modules
const express = require("express");
const admin = require("firebase-admin");

// Initialize Firebase Admin with Service Account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// POST endpoint to add data to Firestore
app.post("/file-gst", async (req, res) => {
    try {
        // Retrieve data from the request body
        const { name, totalBookingAmount, status } = req.body;

        // Validate required fields
        if (!name || !totalBookingAmount || !status) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Reference to the Firestore collection
        const bookingsRef = db.collection("bookings");

        // Create the data object
        const bookingData = {
            name,
            totalBookingAmount,
            status,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        // Add a new document to the collection
        const docRef = await bookingsRef.add(bookingData);

        res.status(201).json({
            message: "Booking added successfully.",
            documentId: docRef.id,
        });
    } catch (error) {
        console.error("Error adding document:", error);
        res.status(500).json({ error: "Failed to add booking." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
