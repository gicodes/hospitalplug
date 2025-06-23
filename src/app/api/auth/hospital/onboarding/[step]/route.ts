import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/sequelize';
import Hospital from '@/model/hospital';

interface OnboardingData {
  email: string;
  step: number;
  data: Record<string, any>;
}

export async function POST(req: NextRequest, { params }: { params: { step: string } }) {
  const { email, data }: OnboardingData = await req.json();
  const step = Number(params.step);

  if (!email || !step || isNaN(step)) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  await connectDB();

  const hospital = await Hospital.findOne({ where: { email } });

  if (!hospital) {
    return NextResponse.json({ message: 'Hospital not found' }, { status: 404 });
  }

  try {
    switch (step) {
      case 2:
        await hospital.update({ contact: data.contact, address: data.address });
        break;
      case 3:
        await hospital.update({ operations: data.operations });
        break;
      case 4:
        await hospital.update({ type: data.type }); // upload required documents
        break;
      case 5:
        await hospital.update({ business: data.business });
        break;
      case 6:
        await hospital.update({ password: data.password });
        break;
      default:
        return NextResponse.json({ message: 'Invalid onboarding step' }, { status: 400 });
    }

    await hospital.update({ onboardingStep: step + 1 });

    return NextResponse.json({ message: `Step ${step} saved`, hospital });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
