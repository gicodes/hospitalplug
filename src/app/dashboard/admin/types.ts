export interface StatCardProps {
  value: number;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

export interface Hospital {
  id: string;
  name: string;
  country: string;
  state: string;
  status: string;
}

export interface ActivationRequest {
  id: string;
  name: string;
  email: string;
  requestedAt: string;
}

export interface Activity {
  id: string;
  message: string;
  createdAt: string;
}