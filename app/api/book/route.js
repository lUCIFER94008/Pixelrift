import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { sendEmail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

// Define the Booking Schema directly or import it
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectName: String,
  plan: String,
  price: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, projectName, plan, price, message } = body;

    await connectDB();

    const newBooking = new Booking({
      name,
      email,
      projectName,
      plan,
      price,
      message,
    });

    await newBooking.save();

    // Send Email
    await sendEmail({
      subject: `New Booking Request: ${projectName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6366f1;">New Project Booking</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project:</strong> ${projectName}</p>
          <p><strong>Plan:</strong> ${plan}</p>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Booking sent successfully!' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process booking.' }, { status: 500 });
  }
}
