import { OnboardingData } from '@/app/auth/hospital/onboarding/page';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/sequelize';
import Hospital from '@/model/hospital';

export async function POST(req: NextRequest) {
  try {
    const stepParam = req.nextUrl.pathname.split('/').pop();
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
        await hospital.update({ documents: data.documents as object });
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
