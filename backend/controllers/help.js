const HelpRequest = require("../models/helpRequest");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_API);

exports.sendHelpRequest = async (req, res) => {
  const { email, comment } = req.body;
  if (!email || !comment) {
    return res.status(400).json({ message: "Email and comment are required." });
  }

  try {
    // Save to DB
    const help = await HelpRequest.create({ email, comment });

    // Send email
    const msg = {
      to: process.env.HELP_TO_EMAIL,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: "TaskPro - Help Request",
      text: `User email: ${email}\n\nComment:\n${comment}`,
    };

    await sgMail.send(msg);

    res.status(201).json({ message: "Help request sent!", help });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: err.message || "Could not send help request. Try again later.",
      });
  }
};
