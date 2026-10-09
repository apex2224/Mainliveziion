const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  tls: { rejectUnauthorized: false },
});

router.get('/ping', (req, res) => res.json({ ok: true }));

router.post('/apply', upload.single('resume'), async (req, res) => {
  const { fullName, email, phone, location, experience, portfolio, linkedin, coverLetter, jobTitle } = req.body;

  try {
    await transporter.sendMail({
      from: `"Ziion Careers" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `New Application: ${jobTitle} — ${fullName}`,
      html: `
        <h2>New Job Application</h2>
        <p><b>Position:</b> ${jobTitle}</p>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Location:</b> ${location || '—'}</p>
        <p><b>Experience:</b> ${experience || '—'}</p>
        <p><b>Portfolio:</b> ${portfolio || '—'}</p>
        <p><b>LinkedIn:</b> ${linkedin || '—'}</p>
        <p><b>Cover Letter:</b><br/>${coverLetter || '—'}</p>
      `,
      attachments: req.file ? [{ filename: req.file.originalname, content: req.file.buffer }] : [],
    });

    await transporter.sendMail({
      from: `"Ziion Technology" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Application Received — ${jobTitle} at Ziion Technology`,
      html: `
        <h2>Hi ${fullName},</h2>
        <p>Thank you for applying for <b>${jobTitle}</b> at Ziion Technology.</p>
        <p>We've received your application and will review it shortly. If your profile matches our requirements, our team will reach out to you.</p>
        <br/>
        <p>Best regards,<br/>Team Ziion Technology</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Career apply error:', err);
    res.status(500).json({ success: false, message: 'Email sending failed' });
  }
});

module.exports = router;
