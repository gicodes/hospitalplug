// === mockData.ts ===

export const mockActivationRequests = [
  {
    id: 'req1',
    name: 'Saint Mary Hospital',
    email: 'contact@stmary.com',
    requestedAt: '2025-07-01T09:00:00Z',
  },
  {
    id: 'req2',
    name: 'Greenfield Clinic',
    email: 'info@greenfield.com',
    requestedAt: '2025-07-01T11:30:00Z',
  },
  {
    id: 'req3',
    name: 'Sunshine Health Center',
    email: 'admin@sunshinehc.com',
    requestedAt: '2025-07-02T08:15:00Z',
  },
];

export const mockRecentActivities = [
  {
    id: 'act1',
    message: 'Verified Greenfield Clinic',
    createdAt: '2025-07-02T10:00:00Z',
  },
  {
    id: 'act2',
    message: 'Approved activation for Sunshine Health Center',
    createdAt: '2025-07-02T12:45:00Z',
  },
  {
    id: 'act3',
    message: 'New hospital onboarding: Saint Mary Hospital',
    createdAt: '2025-07-02T14:20:00Z',
  },
];

export const mockHospitals = [
  {
    id: 'hosp1',
    name: 'Saint Mary Hospital',
    country: 'Nigeria',
    state: 'Lagos',
    status: 'pending',
  },
  {
    id: 'hosp2',
    name: 'Greenfield Clinic',
    country: 'Ghana',
    state: 'Accra',
    status: 'verified',
  },
  {
    id: 'hosp3',
    name: 'Sunshine Health Center',
    country: 'Kenya',
    state: 'Nairobi',
    status: 'pending',
  },
];
