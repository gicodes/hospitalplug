import admin from 'firebase-admin';
import serviceAccountJson from '../../../server/lib/hospitalplug-922b1-firebase-adminsdk-fbsvc-08ec03b6ad.json';

import { ServiceAccount } from 'firebase-admin';

const serviceAccount = serviceAccountJson as ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
