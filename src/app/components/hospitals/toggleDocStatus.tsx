import { useState } from 'react';

const DoctorStatusToggle = ({ doctorId, initialStatus }: { doctorId: string; initialStatus: boolean }) => {
  const [online, setOnline] = useState(initialStatus);

  const toggleStatus = async () => {
    const res = await fetch(`/api/doctors/${doctorId}/status`, {
      method: 'POST',
      body: JSON.stringify({ online: !online }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) setOnline(!online);
  };

  return (
    <button 
      className='btn-primary' 
      onClick={toggleStatus}
    >
      {online ? '🟢 Online - Toggle Off' : '🔴 Offline - Toggle On'}
    </button>
  );
};

export default DoctorStatusToggle;