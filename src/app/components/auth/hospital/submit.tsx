import api from "@/lib/axios";
import { StepProps } from "./authOTP";
import React, { useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import styles from '../../../auth/hospital/onboarding/page.module.css';
import { LiaBathSolid, LiaBedSolid, LiaToiletSolid } from "react-icons/lia";

// Step 3, 4 (Optional) and 5: Submit Docs, Set Business & Final Submission
export default function Step3({ onBack, onNext, form, setForm }: StepProps) {
  const [local, setLocal] = useState({
    hostType: '',
    roomSize: '',
    roomPrice: '',
    totalNumberOfBeds: '',
    totalNumberOfToilets: '',
    totalNumberOfBaths: '',
    remark: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isVetted, setIsVetted] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    setForm((prev: typeof form) => ({ ...prev, business: local }));
    setSaving(true);

    try {
      await api.post('/api/auth/hospital/register/save', { business: local });
      alert('Business information saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving business information');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  const handleSubmit = async () => {
    setForm((prev: typeof form) => ({ ...prev, business: local }));

    const finalPayload = {
      ...form,
      business: local,
    };

    try {
      setSubmitting(true);
      await api.post('/api/auth/hospital/register/submit', finalPayload);
      alert('Successfully submitted!');
      onNext(); // or redirect
      // alert-- Verifying these information may take some time. 
      // alert-- You will be allowed one business service slot until your documents are verified
      setIsVetted(true);
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.steps}>
      <div className={styles.reqDocs}>
        <div className={styles.stepHeader}>
          <h4>Submit Required Documents</h4>      
          <span>Please upload your license including any relevant accreditation documents</span>
        </div>
        
        <div className={styles.uploadDocs}>
          <label>
            <IoDocumentAttach color="#30b35a" size={24} style={{ marginRight: 8 }} />
            <span>Upload Documents</span>
            <input
              required
              type="file"
              multiple
              accept=".pdf,.jpg,.png"
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
      <hr/>

      <div className={`${styles.businessInfo} ${isVetted ? '' : styles.businessInfoDisabled}`}>
        <div className={styles.stepHeader}>
          <h4>Set Business Information (Optional)</h4>
          <span>Provide details about your facility and hospitality services with pricing</span>
        </div>

        <input
          className={styles.input}
          placeholder="Accomodation e.g. Maternity, Apartment, Luxury, etc"
          value={local.hostType}
          onChange={e => setLocal({ ...local, hostType: e.target.value })}
          autoComplete="off"
        />

        <div className="input-group">
          <input
            placeholder="Room size e.g. Standard, Single, Double, etc"
            type="text"
            className="max-width-360"
            value={local.roomSize}
            onChange={e => setLocal({ ...local, roomSize: e.target.value })}
            autoComplete="off"
          />
          <input
            placeholder="Price/ day"
            type="number"
            className="max-width-100"
            value={local.roomPrice}
            onChange={e => setLocal({ ...local, roomPrice: e.target.value })}
            autoComplete="off"
          />
        </div>

        <div className={styles.roomPricing}>  
          <div>
            <label>Total Beds <LiaBedSolid fontSize={13} /></label>
            <input
              placeholder="0"
              type="number"
              className="min-width-75"
              value={local.totalNumberOfBeds}
              onChange={e => setLocal({ ...local, totalNumberOfBeds: e.target.value })}
              autoComplete="off"
            />
          </div>
          <div>
            <label>Toilets <LiaToiletSolid fontSize={14} /></label>
            <input
              placeholder="0"
              type="number"
              className="min-width-75"
              value={local.totalNumberOfToilets}
              onChange={e => setLocal({ ...local, totalNumberOfToilets: e.target.value })}
              autoComplete="off"
            />
          </div>
          <div>
            <label>Total Baths <LiaBathSolid fontSize={14} /></label>
            <input
              placeholder="0"
              type="number"
              className="min-width-75"
              value={local.totalNumberOfBaths}
              onChange={e => setLocal({ ...local, totalNumberOfBaths: e.target.value })}
              autoComplete="off"
            />
          </div>
        </div>
        
        <input
          placeholder="Remarks  (optional)"
          value={local.remark}
          className="max-width-360 mx-auto"
          onChange={e => setLocal({ ...local, remark: e.target.value })}
          autoComplete="off"
        />
        <br/>

        <button className="btn-success" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
      <hr/>

      <div className={styles.setPasswordSection}>
        <div className={styles.stepHeader}>
          <h4>Create Account Password</h4>
          <span>Set a secure password for your admin account</span>
        </div>

        <div className={styles.password}>
          <div className={styles.passwordWrapper}>
            <input
              required
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={typeof form.password === 'string' ? form.password : ''}
              onChange={e => setForm((prev: typeof form) => ({ ...prev, password: e.target.value }))}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
         
          <div className={styles.passwordWrapper}>
            <input
              required
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={typeof form.password === 'string' ? form.password : ''}
              onChange={e => setForm((prev: typeof form) => ({ ...prev, confirmPassword: e.target.value }))}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
        </div>
      </div>
      <hr/>

      <div className="btn-group">
        <button className="btn-secondary" onClick={handleBack}>Back</button>
        <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Finish'}
        </button>
      </div>
    </div>
  );
}
