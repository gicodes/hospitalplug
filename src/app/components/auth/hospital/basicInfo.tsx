'use client';

import { StepProps } from './authOTP';
import React, { useState } from 'react';
import styles from '../../../auth/hospital/onboarding/page.module.css';
import { hospitalTypes } from '@/app/assets/hospitalTypes';
import { countries, majorCitiesByCountry, statesInNigeria, lgasInNigeria } from '@/app/assets/locations';

export default function Step1({ onNext, form, setForm }: StepProps) {
  const [local, setLocal] = useState(form.basic || {
    name: '',
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      website: '',
    },
    address: {
      country: '',
      state: '',
      city: '',
      street: '',
    },
    type: [],
  });

  const handleSubmit = () => {
    setForm((prev: any) => ({ ...prev, basic: local }));
    onNext();
  };

  const isNigeria = local.address.country === 'Nigeria';
  const availableCities = isNigeria
    ? lgasInNigeria[local.address.state] || []
    : majorCitiesByCountry[local.address.country] || [];

  return (
    <div className={styles.steps}>
      <h4>Basic Info</h4>

      <input
        placeholder="Hospital Name"
        value={local.name}
        onChange={e => setLocal({ ...local, name: e.target.value })}
      />

      <div className={styles.inputGroup}>
        <input
          placeholder="Phone"
          value={local.contact.phone}
          onChange={e => setLocal({ ...local, contact: { ...local.contact, phone: e.target.value } })}
        />
        <input
          placeholder="Whatsapp"
          value={local.contact.whatsapp}
          onChange={e => setLocal({ ...local, contact: { ...local.contact, whatsapp: e.target.value } })}
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          placeholder="Email"
          value={local.contact.email}
          onChange={e => setLocal({ ...local, contact: { ...local.contact, email: e.target.value } })}
        />
        <input
          placeholder="Website"
          value={local.contact.website}
          onChange={e => setLocal({ ...local, contact: { ...local.contact, website: e.target.value } })}
        />
      </div>
      
      <span className={styles.subtitle}>Set your location</span>
      <div className={styles.inputGroup}>
        <select
          className={styles.select}
          value={local.address.country}
          onChange={e => setLocal({ ...local, address: { ...local.address, country: e.target.value, state: '', city: '' } })}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {isNigeria && (
          <select
            className={styles.select}
            value={local.address.state}
            onChange={e => setLocal({ ...local, address: { ...local.address, state: e.target.value, city: '' } })}
          >
            <option value="">Select State</option>
            {statesInNigeria.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        )}

        <select
          className={styles.select}
          value={local.address.city}
          onChange={e => setLocal({ ...local, address: { ...local.address, city: e.target.value } })}
        >
          <option value="">Select {isNigeria ? 'LGA' : 'City'}</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <input
        className={styles.input}
        placeholder="Street Address"
        value={local.address.street}
        onChange={e => setLocal({ ...local, address: { ...local.address, street: e.target.value } })}
      />

      <span className={styles.subtitle}>Select institution type(s)</span>
      <div className={styles.radioGroup}>
        {hospitalTypes.map((t) => (
          <label key={t.name} className={"radioTag"}>
            <span style={{ marginRight: 4 }}>{t.name}</span>
            <input
              type="checkbox"
              checked={local.type.includes(t.name)}
              onChange={e => {
                const checked = e.target.checked;
                setLocal((prev: { type: any[]; }) => ({
                  ...prev,
                  type: checked
                    ? [...prev.type, t.name]
                    : prev.type.filter((name: string) => name !== t.name)
                }));
              }}
            />
          </label>
        ))}
      </div>
      <br/>

      <button className="btn-primary mx-auto full-width max-width-360" onClick={handleSubmit}>Next</button>
    </div>
  );
}
