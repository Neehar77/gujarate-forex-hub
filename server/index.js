import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Trust proxy (required for Render/Heroku etc. where app sits behind a load balancer)
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validation middleware
const validateContactForm = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please provide a valid phone number'),
  body('service').trim().isLength({ min: 1, max: 100 }).withMessage('Service is required'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
];

const validateQuoteRequest = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please provide a valid phone number'),
  body('service').trim().isLength({ min: 1, max: 100 }).withMessage('Service is required'),
  body('amount').optional().isNumeric().withMessage('Amount must be a number'),
  body('currency').optional().trim().isLength({ min: 1, max: 10 }).withMessage('Currency is required')
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Vallabh Forex API is running',
    timestamp: new Date().toISOString()
  });
});

// Contact form submission
app.post('/api/contact', validateContactForm, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    const transporter = createTransporter();

    // Email to company
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || 'vallabhforex@gmail.com',
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Interested In:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
      `
    };

    // Confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Vallabh Forex',
      html: `
        <h2>Thank you for contacting Vallabh Forex!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry about <strong>${service}</strong> and will get back to you within 24 hours.</p>
        <p>Here's a copy of your message:</p>
        <blockquote>${message}</blockquote>
        <p>If you have any urgent queries, please call us at <strong>+91 9913647948</strong>.</p>
        <br>
        <p>Best regards,<br>Team Vallabh Forex</p>
        <hr>
        <p><small>Vallabh Forex Pvt Ltd<br>Ahmedabad, Gujarat</small></p>
      `
    };

    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or call us directly.'
    });
  }
});

// Quote request endpoint
app.post('/api/quote', validateQuoteRequest, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, service, amount, currency, additionalInfo } = req.body;

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || 'vallabhforex@gmail.com',
      subject: `New Quote Request - ${service}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        ${amount ? `<p><strong>Amount:</strong> ${amount} ${currency || ''}</p>` : ''}
        ${additionalInfo ? `<p><strong>Additional Info:</strong> ${additionalInfo}</p>` : ''}
        <hr>
        <p><small>Requested on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Quote request submitted successfully! We will provide you with the best rates within 2 hours.'
    });

  } catch (error) {
    console.error('Quote request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please try again or call us directly.'
    });
  }
});

// Service inquiry endpoint
app.post('/api/service-inquiry', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please provide a valid phone number'),
  body('service').trim().isLength({ min: 1, max: 100 }).withMessage('Service is required')
], handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, service } = req.body;

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || 'vallabhforex@gmail.com',
      subject: `Service Inquiry - ${service}`,
      html: `
        <h2>New Service Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <hr>
        <p><small>Inquired on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Service inquiry submitted! We will contact you with detailed information.'
    });

  } catch (error) {
    console.error('Service inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again or call us directly.'
    });
  }
});

// Exchange rates endpoint (mock data for now)
app.get('/api/exchange-rates', (req, res) => {
  const rates = {
    USD: { buy: 83.25, sell: 83.45, lastUpdated: new Date().toISOString() },
    EUR: { buy: 90.15, sell: 90.35, lastUpdated: new Date().toISOString() },
    GBP: { buy: 105.80, sell: 106.00, lastUpdated: new Date().toISOString() },
    AED: { buy: 22.65, sell: 22.75, lastUpdated: new Date().toISOString() },
    SGD: { buy: 61.20, sell: 61.40, lastUpdated: new Date().toISOString() },
    AUD: { buy: 54.30, sell: 54.50, lastUpdated: new Date().toISOString() }
  };

  res.json({
    success: true,
    data: rates,
    disclaimer: 'Rates are indicative and subject to change. Please contact us for exact rates.'
  });
});

// Services endpoint
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: "Foreign Currency Buy & Sell",
      description: "Best exchange rates for all major currencies with quick and secure transactions.",
      features: ["Live Exchange Rates", "Multiple Currencies", "Instant Processing", "RBI Authorized"],
      icon: "DollarSign"
    },
    {
      id: 2,
      title: "Foreign Currency Travel Card",
      description: "Convenient prepaid travel cards for international trips with competitive rates.",
      features: ["Multi-Currency Card", "Secure Transactions", "Global Acceptance", "Easy Reloading"],
      icon: "Coins"
    },
    {
      id: 3,
      title: "Foreign Currency Remittance",
      description: "Fast and secure money transfer services to international destinations.",
      features: ["Quick Transfers", "Competitive Rates", "Secure Process", "Global Network"],
      icon: "TrendingUp"
    },
    {
      id: 4,
      title: "Travel Insurance",
      description: "Comprehensive travel insurance coverage for international and domestic trips.",
      features: ["Medical Coverage", "Trip Cancellation", "Baggage Protection", "24/7 Support"],
      icon: "Shield"
    }
  ];

  res.json({
    success: true,
    data: services
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Vallabh Forex API server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8081'}`);
});
