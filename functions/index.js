


const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.processInvoices = functions.https.onRequest(async (req, res) => {
    try {
        // Fetch documents with `status: "finished"`
        const snapshot = await db.collection("bookings").where("status", "finished").get();
        if (snapshot.empty) {
            res.status(200).send("No documents to process");
            return;
        }

        const batch = db.batch();

        snapshot.forEach((doc) => {
            const data = doc.data();
            const totalBookingAmount = data.totalBookingAmount || 0;

            // Calculate GST
            const GST_RATE = 0.18;
            const CGST_RATE = GST_RATE / 2;
            const SGST_RATE = GST_RATE / 2;

            const cgst = totalBookingAmount * CGST_RATE;
            const sgst = totalBookingAmount * SGST_RATE;

            // Prepare Invoice
            const invoice = {
                customerName: data.name,
                totalBookingAmount,
                cgst,
                sgst,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            // Add to "invoices" collection
            const invoiceRef = db.collection("invoices").doc();
            batch.set(invoiceRef, invoice);

            // Optionally, update booking document
            batch.update(doc.ref, { status: "processed" });
        });

        await batch.commit();
        res.status(200).send("Invoices processed successfully");
    } catch (error) {
        console.error("Error processing invoices:", error);
        res.status(500).send("An error occurred while processing invoices");
    }
});










/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
