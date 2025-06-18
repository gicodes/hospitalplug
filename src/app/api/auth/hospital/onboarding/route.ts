import { NextApiRequest, NextApiResponse } from 'next';
import Hospital from '@/lib/model';
import admin from '@/lib/firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).json({ message: 'Method not allowed' });

  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const firebaseUid = decoded.uid;

    const hospital = await Hospital.findOne({ where: { firebaseUid } });
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    const { onboardingStep, ...updateData } = req.body;

    await hospital.update({
      ...updateData,
      onboardingStep: onboardingStep || hospital.onboardingStep + 1,
    });

    return res.status(200).json({ message: 'Hospital profile updated', hospital });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}