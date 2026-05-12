import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { contactSchema } from '@/lib/schemas/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendContactEmail(result.data);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
