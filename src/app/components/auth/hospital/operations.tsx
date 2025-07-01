'use client';

import React from "react";
import { StepProps } from "./authOTP";
import styles from '../../../auth/hospital/onboarding/page.module.css';
import { OnboardingForm } from "@/app/auth/hospital/onboarding/page";

const essentialServices = {
  hasFoodCanteen: "Food Canteen",
  hasEmergency: "Emergency Service",
  hasAmbulance: "Standby Ambulance",
  securePremises: "Secure Premises",
  has247PowerSupply: "24/7 Power Supply",
  hasSteadyWaterSupply: "Steady Water Supply",
  hashealthcareFacilities: "Health Care Facilities",
} as const;

export default function Step3({ form, onBack, onNext, setForm }: StepProps) {
  const handleSubmit = () => onNext();

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className={styles.steps}>
      <h4>Operations & Services</h4>

      <label>Service Specialisation</label>
      <input
        type="text"
        className={styles.input}
        placeholder="General, Pediatrics, Psychiatry, Surgery, Obstetrics, etc."
        value={form.operations?.serviceSpecialties?.join(', ') || ''}
        onChange={e => setForm(prev => ({
          ...prev,
          operations: {
            ...prev.operations,
            serviceSpecialties: e.target.value.split(',').map(s => s.trim()),
          },
        }))}
      />

      <select 
        value={form.operations?.schedule || ''}
        className={styles.select}
        onChange={e => setForm(prev => ({
          ...prev,
          operations: {
            ...prev.operations,
            schedule: e.target.value,
          },
        }))}
      >
        <option value="">Select Schedule</option>
        <option value="8hrs-weekdays">8 hrs, Mon - Fri</option>
        <option value="12-16hrs-daily">12–16 hr, 7 days</option>
        <option value="24-7">24/7 Open services</option>
      </select>

      <label>Indicate Opening hours (if schedule is undefined)</label>
      <input 
        className={styles.input}
        placeholder="Opening Hours:  8am * Mon - Fri" 
        value={form.operations?.openingHours || ''}
        onChange={e => setForm(prev => ({
          ...prev,
          operations: {
            ...prev.operations,
            openingHours: e.target.value,
          },
        }))}
      />

      <select
        value={form.operations?.numberOfHealthWorkers || ''}
        className={styles.select}
        onChange={e => setForm(prev => ({
          ...prev,
          operations: {
            ...prev.operations,
            numberOfHealthWorkers: e.target.value,
          },
        }))}
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
                checked={Boolean(form.operations?.[key as keyof OnboardingForm['operations']])}
                onChange={e => setForm(prev => ({
                  ...prev,
                  operations: {
                    ...prev.operations,
                    [key]: e.target.checked,
                  },
                }))}
              />
            </label>
          </div>
        ))}
      </div>

      <p className={styles.subtitle}>Accepted mode(s) of payment</p>
      <span className={styles.caption}>You can select multiple options</span>
      <div className={styles.radioGroup}>
        {["cash", "card", "insurance", "mobileMoney"].map((mode) => (
          <label key={mode} className="radioTag">
            {mode === "cash" && "Cash"}
            {mode === "card" && "Card"}
            {mode === "insurance" && "Insurance"}
            {mode === "mobileMoney" && "Mobile Transfer"}
            <input
              type="checkbox"
              className="tickbox"
              checked={form.operations?.modesOfPayments?.includes(mode as OnboardingForm['operations']['modesOfPayments'][number]) || false}
              onChange={e => {
                const currentModes = form.operations?.modesOfPayments || [];
                const updated = e.target.checked
                  ? [...currentModes, mode as OnboardingForm['operations']['modesOfPayments'][number]]
                  : currentModes.filter((m) => m !== mode);
                setForm(prev => ({
                  ...prev,
                  operations: {
                    ...prev.operations,
                    modesOfPayments: updated,
                  },
                }));
              }}
            />
          </label>
        ))}
      </div>
      
      <br />
      <div className="btn-group">
        <button className="btn-secondary" onClick={handleBack}>Back</button>
        <button className="btn-success" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
}
