'use client';

import React from 'react';
import { StepProps } from './authOTP';
import { hospitalTypes } from '@/app/assets/hospitalTypes';
import styles from '../../../auth/hospital/onboarding/page.module.css';
import { OnboardingForm } from '@/app/auth/hospital/onboarding/page';
import { countries, majorCitiesByCountry, statesInNigeria, lgasInNigeria } from '@/app/assets/locations';

export default function Step1({ onNext, form, setForm }: StepProps) {
  const handleSubmit = () => {
    setForm((prev: OnboardingForm) => ({
      ...prev,
      contact: {
        phone: form.contact?.phone || '',
        email: form.contact?.email || '',
        whatsapp: form.contact?.whatsapp || '',
        website: form.contact?.website || '',
      },
    }));
    onNext();
  };

  const isNigeria = form.address?.country === 'Nigeria';
  const availableCities = isNigeria
    ? (form.address?.state ? lgasInNigeria[form.address.state] || [] : [])
    : (form.address?.country ? majorCitiesByCountry[form.address.country] || [] : []);

  return (
    <div className={styles.steps}>
      <h4>Basic Info</h4>

      <label>Name of Institution</label>
      <input
        type='text'
        required
        placeholder="Hospital Name"
        value={form.name || ''}
        onChange={e => setForm(prev => ({
          ...prev,
          name: e.target.value,
        }))}
      />

      <div className={styles.inputGroup}>
        <input
          required
          placeholder="Phone"
          value={form.contact?.phone || ''}
          onChange={e => setForm(prev => ({
            ...prev,
            contact: {
              ...prev.contact,
              phone: e.target.value,
              email: prev.contact?.email || '',
              whatsapp: prev.contact?.whatsapp || '',
              website: prev.contact?.website || '',
            },
          }))}
        />
        <input
          placeholder="Whatsapp"
          value={form.contact?.whatsapp || ''}
          onChange={e => setForm(prev => ({
            ...prev,
            contact: {
              ...prev.contact,
              whatsapp: e.target.value,
              phone: prev.contact?.phone || '',
              email: prev.contact?.email || '',
              website: prev.contact?.website || '',
            },
          }))}
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type='email'
          required
          placeholder="Customer Support Email"
          value={form.contact?.email || ''}
          onChange={e => setForm(prev => ({
            ...prev,
            contact: {
              ...prev.contact,
              email: e.target.value,
              phone: prev.contact?.phone || '',
              whatsapp: prev.contact?.whatsapp || '',
              website: prev.contact?.website || '',
            },
          }))}
        />
        <input
          placeholder="Website"
          value={form.contact?.website || ''}
          onChange={e => setForm(prev => ({
            ...prev,
            contact: {
              ...prev.contact,
              website: e.target.value,
              phone: prev.contact?.phone || '',
              email: prev.contact?.email || '',
              whatsapp: prev.contact?.whatsapp || '',
            },
          }))}
        />
      </div>

      <span className={styles.subtitle}>Set your location</span>
      <div className={styles.inputGroup}>
        <select
          required
          className={styles.select}
          value={form.address?.country || ''}
          onChange={e => setForm(prev => ({
            ...prev,
            address: {
              ...prev.address,
              country: e.target.value,
              state: '',
              city: '',
              street: prev.address?.street || '',
              zip: prev.address?.zip || '',
            },
          }))}
        >
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {isNigeria && (
          <select
            className={styles.select}
            value={form.address?.state || ''}
            onChange={e => setForm(prev => ({
              ...prev,
              address: {
                ...prev.address,
                state: e.target.value,
                city: '',
                country: prev.address?.country || '',
                street: prev.address?.street || '',
                zip: prev.address?.zip || '',
              },
            }))}
          >
            <option value="">Select State</option>
            {statesInNigeria.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        )}

        <select
          className={styles.select}
          value={form.address?.city || ''}
          onChange={e => setForm(prev => ({
            ...prev,
            address: {
              ...prev.address,
              city: e.target.value,
              state: prev.address?.state || '',
              country: prev.address?.country || '',
              street: prev.address?.street || '',
              zip: prev.address?.zip || '',
            },
          }))}
        >
          <option value="">Select {isNigeria ? 'LGA' : 'City'}</option>
          {availableCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <input
        required
        className={styles.input}
        placeholder="Street Address"
        value={form.address?.street || ''}
        onChange={e => setForm(prev => ({
          ...prev,
          address: {
            ...prev.address,
            street: e.target.value,
            city: prev.address?.city || '',
            state: prev.address?.state || '',
            zip: prev.address?.zip || '',
            country: prev.address?.country || '',
          },
        }))}
      />

      <span className={styles.subtitle}>Select institution type(s)</span>
      <div className={styles.radioGroup}>
        {hospitalTypes.map(t => (
          <label key={t.name} className="radioTag">
            <span style={{ marginRight: 4 }}>{t.name}</span>
            <input
              required
              type="checkbox"
              className="tickbox"
              checked={form.type?.includes(t.name as OnboardingForm['type'][number]) || false}
              onChange={e => {
                const currentTypes = form.type || [];
                const updated = e.target.checked
                  ? [...currentTypes, t.name as OnboardingForm['type'][number]]
                  : currentTypes.filter(m => m !== t.name);
                setForm(prev => ({
                  ...prev,
                  type: updated,
                }));
              }}
            />
          </label>
        ))}
      </div>

      <br />
      <button className="btn-success mx-auto full-width max-width-360" onClick={handleSubmit}>Next</button>
    </div>
  );
}
