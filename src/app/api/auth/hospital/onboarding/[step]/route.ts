import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/sequelize';
import Hospital from '@/model/hospital';

interface OnboardingData {
  email: string;
  data: {
    contact?: {
      name: string;
      phone: string;
      email: string;
    };
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    operations?: {
      hours: string;
      services: string[];
    };
    docs?: string[];
    business?: {
      registrationNumber: string;
      taxId: string;
    };
    password?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const stepParam = req.nextUrl.pathname.split('/').pop(); // Extract the dynamic [step]
    const step = Number(stepParam);

    if (!step || isNaN(step)) {
      return NextResponse.json({ message: 'Invalid onboarding step' }, { status: 400 });
    }

    const body: OnboardingData = await req.json();
    const { email, data } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    const hospital = await Hospital.findOne({ where: { email } });

    if (!hospital) {
      return NextResponse.json({ message: 'Hospital not found' }, { status: 404 });
    }

    switch (step) {
      case 2:
        await hospital.update({ contact: data.contact, address: data.address });
        break;
      case 3:
        await hospital.update({ operations: data.operations });
        break;
      case 4:
        await hospital.update({ type: data.docs }); // Assuming `type` is meant to be `docs`
        break;
      case 5:
        await hospital.update({ business: data.business });
        break;
      case 6:
        await hospital.update({ password: data.password });
        break;
      default:
        return NextResponse.json({ message: 'Unknown onboarding step' }, { status: 400 });
    }

    await hospital.update({ onboardingStep: step + 1 });

    return NextResponse.json({ message: `Step ${step} saved`, hospital });
  } catch (error) {
    console.error('[ONBOARDING_ERROR]', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
