const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Shared mail transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'navyaa3006@gmail.com', // Your email
    pass: 'pmvc dhbi jsod ahuw', // Your email password or app password
  },
});

// Route for booking form
app.post('/booknow', async (req, res) => {
  const formData = req.body;

  const mailOptions = {
    from: 'navyaa3006@gmail.com',
    to: 'anavya.a06@gmail.com',
    subject: 'New Booking Request',
    text: `New Booking Details:
    - Name: ${formData.name}
    - Email: ${formData.email}
    - Phone Number: ${formData.number}
    - Destination: ${formData.destination}
    - Departure Date: ${formData.departureDate}
    - Return Date: ${formData.returnDate || 'Not specified'}
    - Adults: ${formData.adults}
    - Children: ${formData.children || 'None'}
    - Add-ons: ${formData.addons || 'None'}
    - Maximum Budget: ${formData.budgetMax || 'Not specified'}
    - Travel Type: ${formData.travelType || 'Not specified'}
    - Preferred Activities: ${formData.activities || 'Not specified'}
    - Accommodation Type: ${formData.accommodation || 'Not specified'}
    - Mode of Transport: ${formData.transportMode || 'Not specified'}
    - Meal Preferences: ${formData.mealPreference || 'Not specified'}
    - Special Deals: ${formData.specialDeals || 'Not specified'}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Booking details sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send booking details.');
  }
});

// Route for feedback form
app.post('/submit-feedback', async (req, res) => {
  const feedbackData = req.body;

  const mailOptions = {
    from: 'navyaa3006@gmail.com',
    to: 'anavya.a06@gmail.com',
    subject: 'New Feedback Received',
    text: `Feedback Details:
    - Name: ${feedbackData.name}
    - Email: ${feedbackData.email}
    - Rating: ${feedbackData.rating}
    - Preferences: ${feedbackData.preferences || 'None'}
    - Suggestions: ${feedbackData.suggestions || 'None'}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Feedback submitted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to submit feedback.');
  }
});

// Route for contact form
app.post('/contact', async (req, res) => {
  const contactData = req.body;

  const mailOptions = {
    from: 'navyaa3006@gmail.com',
    to: 'anavya.a06@gmail.com',
    subject: 'New Contact Message',
    text: `Contact Details:
    - Name: ${contactData.name}
    - Email: ${contactData.email}
    - Message: ${contactData.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send message.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
