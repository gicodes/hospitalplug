'use client';

import React, { useState } from "react";
import { StepProps } from "./authOTP";
import styles from '../../../auth/hospital/onboarding/page.module.css';

const essentialServices = {
  hasFoodCanteen: "Food Canteen",
  hasEmergency: "Emergency Service",
  hasAmbulance: "Standby Ambulance",
  securePremises: "Secure Premises",
  has247PowerSupply: "24/7 Power Supply",
  hasSteadyWaterSupply: "Steady Water Supply",
  hashealthcareFacilities: "Health Care Facilities",
};

export const equipmentsAndFacilities = {
  hasPharmacy: "Pharmacy",
  hasLaboratory: "Laboratory",
  hasRadiology: "Radiology",
  hasBloodBank: "Blood Bank",
  hasDialysis: "Dialysis",
  hasICU: "ICU",
  hasTheatre: "Theatre",
};

export default function Step3({ onBack, onNext, setForm }: StepProps) {
  const [local, setLocal] = useState<{
    schedule: string;
    openingHours: string;
    serviceSpecialties: string[];
    hasEmergency: boolean;
    hasAmbulance: boolean;
    hasFoodCanteen: boolean;
    securePremises: boolean;
    numberOfHealthWorkers: string;
    has247PowerSupply: boolean;
    hasSteadyWaterSupply: boolean;
    hashealthcareFacilities: boolean;
    modeOfPayment: string[];
  }>({
    schedule: '', 
    openingHours: '', 
    serviceSpecialties: [],
    hasEmergency: false,
    hasAmbulance: false,
    hasFoodCanteen: false,
    securePremises: false,
    numberOfHealthWorkers: '',
    has247PowerSupply: false,
    hasSteadyWaterSupply: false,
    hashealthcareFacilities: false,
    modeOfPayment: [], 
  });

  const handleSubmit = () => {
    setForm((prev: Record<string, unknown>) => ({
      ...prev,
      operations: local,
    }));
    onNext();
  };

  const handleBack = () => {
    setForm((prev: Record<string, unknown>) => ({
      ...prev,
      operations: local,
    }));
    if (onBack) onBack();
  }

  return (
    <div className={styles.steps}>
      <h4>Operations & Services</h4>

      <input
        type="text"
        className={styles.input}
        placeholder="Specialisation... i.e General, Pediatrics, Psychiatry, Surgery, Obstetrics, etc."
        value={local.serviceSpecialties.join(', ')}
        onChange={e => setLocal({ ...local, serviceSpecialties: e.target.value.split(',').map(s => s.trim()) })}
      />

      <input 
        className={styles.input}
        placeholder="Opening Hours...  i.e. 8:00 AM, Mon - Fri" 
        value={local.openingHours} 
        onChange={e => setLocal({ ...local, openingHours: e.target.value })} 
      />

      <select 
        value={local.schedule} 
        className={styles.select}
        onChange={e => setLocal({ ...local, schedule: e.target.value })}
      >
        <option value="">Select Schedule</option>
        <option value="8hrs-weekdays">8 hrs, Mon - Fri</option>
        <option value="12-16hrs-daily">12–16 hr, 7 days</option>
        <option value="24-7">24/7 Open services</option>
      </select>

      <select
        value={local.numberOfHealthWorkers}
        className={styles.select}
        onChange={e => setLocal({ ...local, numberOfHealthWorkers: e.target.value })}
      >
        <option value="">Estimated Number of Health Workers</option>
        <option value="<10">Less than 10</option>
        <option value="10-50">10 - 50</option>
        <option value="50-100">50 - 100</option>
        <option value=">100">More than 100</option>
      </select>

      <p className={styles.subtitle}>Select Available Service(s)</p>
      <span className={styles.caption}>Please select options available in real-time</span>
      <div className={styles.checkboxGroup}>
        {Object.entries(essentialServices).map(([key, label]) => (
          <div key={key} className={styles.checkboxItem}>
            <label>
              {label}?
              <input
                type="checkbox"
                checked={local[key as keyof typeof essentialServices] as boolean}
                onChange={e => setLocal({ ...local, [key]: e.target.checked })}
              />
            </label>
          </div>
        ))}
      </div>

      <p className={styles.subtitle}>Accepted mode(s) of payment</p>
      <span className={styles.caption}>You can select multiple options</span>
      <div className={styles.radioGroup}>
        {["cash", "card", "insurance", "mobileMoney"].map((mode) => (
            <label key={mode} className={"radioTag"}>
            {mode === "cash" && "Cash"}
            {mode === "card" && "Card"}
            {mode === "insurance" && "Insurance"}
            {mode === "mobileMoney" && "Mobile Transfer"}
            <input
              type="checkbox"
              checked={local.modeOfPayment.includes(mode)}
              onChange={e => {
              const updated = e.target.checked
                ? [...local.modeOfPayment, mode]
                : local.modeOfPayment.filter((m: string) => m !== mode);
              setLocal({ ...local, modeOfPayment: updated });
              }}
            />
            </label>
        ))}
      </div>
      <br/>

      <div className="btn-group">
        <button className="btn-secondary" onClick={handleBack}>Back</button>
        <button className="btn-primary" onClick={handleSubmit}>Next</button>
      </div>
      
    </div>
  );
}
