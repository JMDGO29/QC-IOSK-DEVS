const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
const otpGenerator = require("otp-generator");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "qciosk.devs@gmail.com",
    pass: "nznnnooisdladidf",
  },
});

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore(); // Initialize Firestore

exports.sendEmail = functions.https.onRequest((req, res) => {
  // Enable CORS
  cors(req, res, async () => {
    const recipientEmail = req.body.recipientEmail;

    try {
      // Generate OTP
      const otpOptions = {upperCase: false, specialChars: false};
      const otp = otpGenerator.generate(6, otpOptions);

      // Store the OTP in Firestore
      await db.collection("otps").doc(recipientEmail).set({otp});

      // Send email with OTP
      await transporter.sendMail({
        from: "qciosk.devs@gmail.com",
        to: recipientEmail,
        subject: "Login OTP",
        text: `Your OTP for login is: ${otp}`,
      });

      console.log("Email sent successfully with OTP:", otp);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send(JSON.stringify(error));
    }
  });
});

// Firebase Function to verify OTP
exports.verifyOTP = functions.https.onRequest((req, res) => {
  // Enable CORS
  cors(req, res, async () => {
    // Check if request method is POST
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      // Extract OTP from request body
      const recipientEmail = req.body.recipientEmail;
      const otp = req.body.otp;

      // Get expected OTP from Firestore
      const docRef = db.collection("otps").doc(recipientEmail);
      const doc = await docRef.get();
      if (!doc.exists) {
        return res.status(400).send("OTP not found");
      }

      const expectedOTP = doc.data().otp;

      // Logic to verify OTP
      if (otp === expectedOTP) {
        // OTP is valid
        // Delete the OTP from Firestore after successful verification
        await docRef.delete();
        return res.status(200).send("OTP verified successfully");
      } else {
        // OTP is invalid
        return res.status(400).send("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).send(JSON.stringify(error));
    }
  });
});
