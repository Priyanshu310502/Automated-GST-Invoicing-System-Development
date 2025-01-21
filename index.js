const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function processInvoices() {
    try {
        // Corrected Firestore query with valid operator
        const snapshot = await db.collection("bookings").where("status", "==", "pending").get();

        if (snapshot.empty) {
            console.log("No documents to process");
            return;
        }

        const batch = db.batch();

        snapshot.forEach((doc) => {
            const data = doc.data();
            const totalBookingAmount = data.totalBookingAmount || 0;

            const GST_RATE = 0.18;
            const CGST_RATE = GST_RATE / 2;
            const SGST_RATE = GST_RATE / 2;

            const cgst = totalBookingAmount * CGST_RATE;
            const sgst = totalBookingAmount * SGST_RATE;

            const invoice = {
                customerName: data.name,
                totalBookingAmount,
                cgst,
                sgst,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            const invoiceRef = db.collection("invoices").doc();
            batch.set(invoiceRef, invoice);

            batch.update(doc.ref, { status: "finished" });
        });

        await batch.commit();
        console.log("Invoices processed successfully");
    } catch (error) {
        console.error("Error processing invoices:", error);
    }
}

processInvoices();