// === mockData.ts ===

import { HospitalCard } from "../../index/card";

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
    id: 1, 
    name: "Phoenix Medicals",
    type: ['private'],
    address: {
      country: 'Nigeria', 
      state: 'Enugu', 
      lga: 'Enugu',
    },
    contact: { 
      phone: '0801-234-5678',
      website: 'https://myphoenixmed.com'
    },
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9zcGl0YWxzfGVufDB8fDB8fHww',
    rating: 4.5,
    review: 120
  },
  { 
    id: 2, 
    name: 'Specialist Center', 
    type: ['private', 'specialist'],
    address: {
      country: 'Nigeria',
      state: 'Abuja',
      lga: 'Maitama',
    },
    contact: { 
      phone: '0803-0123-4567'
    },
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWxzfGVufDB8fDB8fHww',
    rating: 4.8,
    review: 87
  },
  { 
    id: 3, 
    name: 'City Hospital',
    type: ['public'],
    address: {
      country: 'Nigeria',
      state: 'Lagos',
      lga: 'Victoria Island',
    },
    isSubscribed: true,
    contact: { 
      phone: '0815-175-2112'
    },
    image: 'https://images.unsplash.com/photo-1670665352618-49ae2ae914ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.7,
    review: 145
  },
  {
    id: 4, 
    name: 'HealthPlus Clinic',
    type: ['clinic', ],
    address: {
      country: 'Nigeria',
      state: 'Abuja',
      lga: 'Apo', 
    },
    isSubscribed: true,
    contact: { 
      phone: '0802-345-6789'
    },
    image: 'https://images.unsplash.com/photo-1580281657702-257584239a55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.6,
    review: 200
  },
  { 
    id: 5, 
    name: 'Teaching Hospital',
    type: ['teaching', 'public'],
    address: {
      country: 'Nigeria',
      state: 'Enugu',
      lga: 'Nsukka'
    },
    isSubscribed: true,
    status: 'verified',
    contact: { phone: '0701-234-5678'},
    image: 'https://images.unsplash.com/photo-1584451049700-ec9b394f3805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.6,
    review: 95
  },
  { 
    id: 6, 
    name: 'Carepoint Clinic',
    type: ['private', 'clinic'], 
    address: {
      country: 'Kenya',
      state: 'Nairobi',
    },
    status: 'pending',
    contact: { phone: '0804-567-8901'},
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D',
    rating: 4.4,
    review: 110
  },
    {
    id: 7,
    name: 'Urban Health Hub',
    type: ['public', 'specialist'],
    address: { country: "South Africa", state: "Cape Town" },
    location: { lat: -33.9249, lng: 18.4241 },
    distance: 890,
    contact: { phone: "0712-345-6789" },
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
    rating: 4.2,
    review: 75
  },
  {
    id: 8,
    name: "Royal Wellness",
    type: ['clinic'],
    address: { country: "Ghana", state: "Accra" },
    location: { lat: 5.6037, lng: -0.1870 },
    distance: 430,
    contact: { phone: "0734-567-8910" },
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
    rating: 4.9,
    review: 150
  }
] satisfies HospitalCard[];
