import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { sendEmail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

// Define the Booking Schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  budget: { type: String, default: '' },
  projectName: { type: String, required: true },
  plan: { type: String, required: true },
  price: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, budget, projectName, plan, price, message } = body;

    // 1. Connect and Save to MongoDB
    await connectDB();
    const newBooking = new Booking({
      name,
      email,
      phone: phone || '',
      budget: budget || '',
      projectName,
      plan,
      price,
      message,
    });
    await newBooking.save();

    // 2. Send Email to Admin
    try {
      await sendEmail({
        subject: `🚀 New Booking: ${projectName} (${plan})`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
            <h2 style="color: #6366f1; margin-bottom: 20px; font-size: 24px; border-bottom: 2px solid #1e293b; padding-bottom: 10px;">New Project Booking</h2>
            <div style="margin-bottom: 15px;">
              <strong style="color: #94a3b8; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Client Name</strong>
              <span style="font-size: 16px;">${name}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #94a3b8; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Contact Email</strong>
              <span style="font-size: 16px;">${email}</span>
            </div>
            ${phone ? `<div style="margin-bottom: 15px;">
              <strong style="color: #94a3b8; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone Number</strong>
              <span style="font-size: 16px;">${phone}</span>
            </div>` : ''}
            ${budget ? `<div style="margin-bottom: 15px;">
              <strong style="color: #94a3b8; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Budget</strong>
              <span style="font-size: 16px; color: #22d3ee; font-weight: bold;">${budget}</span>
            </div>` : ''}
            <div style="margin-bottom: 15px;">
              <strong style="color: #94a3b8; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Selected Project</strong>
              <span style="font-size: 16px;">${projectName}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #94a3b8; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Plan Chosen</strong>
              <span style="font-size: 16px; color: #6366f1; font-weight: bold;">${plan} (${price})</span>
            </div>
            <div style="margin-top: 25px; padding: 20px; background-color: #1e293b; border-radius: 8px;">
              <strong style="color: #94a3b8; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Message</strong>
              <p style="margin: 0; line-height: 1.6;">${message}</p>
            </div>
            <p style="margin-top: 30px; font-size: 10px; color: #475569; text-align: center;">Pixelrift Booking System • Automated Notification</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Email Notification Error:', emailErr);
      // We continue even if email fails, as long as DB is saved
    }

    // 3. Generate WhatsApp Link
    const whatsappPhone = process.env.WHATSAPP_PHONE || '91XXXXXXXXXX';
    const whatsappMsg = `Hello Pixelrift! I'm interested in booking a project.
    
*Project:* ${projectName}
*Plan:* ${plan} (${price})
*Name:* ${name}
*Email:* ${email}${budget ? `\n*Budget:* ${budget}` : ''}${phone ? `\n*Phone:* ${phone}` : ''}
*Requirements:* ${message}`;

    const encodedMsg = encodeURIComponent(whatsappMsg);
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;

    return NextResponse.json({ 
      success: true, 
      message: 'Booking saved and notifications sent.',
      whatsappUrl 
    }, { status: 201 });

  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error processing booking.' 
    }, { status: 500 });
  }
}
