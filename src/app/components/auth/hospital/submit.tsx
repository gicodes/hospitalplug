import api from "@/lib/axios";
import { StepProps } from "./authOTP";
import React, { useState } from "react";
import { useAlert } from "@/contexts/alert-context";
import { IoDocumentAttach } from "react-icons/io5";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import styles from '../../../auth/hospital/onboarding/page.module.css';
import { LiaBathSolid, LiaBedSolid, LiaToiletSolid } from "react-icons/lia";
import { useRouter } from "next/router";

export default function Step4({ userEmail, onBack, onNext, form, setForm }: StepProps) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [isVetted, setIsVetted] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      await api.post('/auth/hospital/onboarding/5', {
        email: userEmail,
        business: form.business
      });
      showAlert('success', 'Business information saved successfully!');
    } catch (err) {
      console.error(err);
      showAlert('error', 'Error saving business information');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  const handleSubmit = async () => {
    const email = userEmail
    const data = form;

    if (data.password !== data.confirmPassword) return;

    try {
      setSubmitting(true);
      await api.post('/auth/hospital/onboarding/submit', { email, data });
      showAlert('success', 'Successfully submitted!');
      onNext();
      showAlert("info", "Verifying this information may take some time...\nYou will be allowed one business service slot until your documents are verified");
      setIsVetted(true);
      router.push('/dashboard/hospital/[menu]')
    } catch (err) {
      console.error(err);
      showAlert('error', 'Error submitting form');
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
                onChange={e => {
                  const files = e.target.files ? Array.from(e.target.files) : [];
                  setForm(prev => ({
                    ...prev,
                    documents: files
                  }));
                }}
              />
            </label>
        </div>
      </div>
      <hr />

      <div className={`${styles.businessInfo} ${isVetted ? '' : styles.businessInfoDisabled}`}>
        <div className={styles.stepHeader}>
          <h4>Set Business Information (Optional)</h4>
          <span>Provide details about your facility and hospitality services with pricing</span>
        </div>

        <input
          className={styles.input}
          placeholder="Facility Type i.e. Private Ward, Apartment"
          value={form.business?.rooms?.type || ""}
          onChange={e => setForm({
            ...form,
            business: {
              ...form.business,
              rooms: {
                ...form.business?.rooms,
                type: e.target.value
              }
            }
          })}
          autoComplete="off"
        />

        <div className="input-group">
          <input
            placeholder="Specification i.e. Standard, Premium"
            type="text"
            className="max-width-360"
            value={form.business?.rooms?.spec || ""}
            onChange={e => setForm({
            ...form,
              business: {
                ...form.business,
                rooms: {
                  ...form.business?.rooms,
                  spec: e.target.value
                }
              }
            })}
            autoComplete="off"
          />
          <input
            placeholder="Price/day"
            type="number"
            className="max-width-100"
            value={form.business?.rooms?.price || ""}
            onChange={e => setForm({
              ...form,
              business: {
                ...form.business,
                rooms: {
                  ...form.business?.rooms,
                  price: e.target.value
                }
              }
            })}
            autoComplete="off"
          />
        </div>

        <div className={styles.roomPricing}>
          <div className="gap-1">
            <label>Total Beds <LiaBedSolid fontSize={13} /></label>
            <input
              placeholder="0"
              type="number"
              className="min-width-75"
              value={form.business?.rooms?.beds || ""}
              onChange={e => setForm({
                ...form,
                business: {
                  ...form.business,
                  rooms: {
                    ...form.business?.rooms,
                    beds: e.target.value
                  }
                }
              })}
              autoComplete="off"
            />
          </div>
          <div className="gap-1">
            <label>Toilets <LiaToiletSolid fontSize={14} /></label>
            <input
              placeholder="0"
              type="number"
              className="min-width-75"
              value={form.business?.rooms?.toilets || ""}
              onChange={e => setForm({
                ...form,
                business: {
                  ...form.business,
                  rooms: {
                    ...form.business?.rooms,
                    toilets: e.target.value
                  }
                }
              })}
              autoComplete="off"
            />
          </div>
          <div className="gap-1">
            <label>Total Baths <LiaBathSolid fontSize={14} /></label>
            <input
              placeholder="0"
              type="number"
              className="min-width-75"
              value={form.business?.rooms?.baths || ""}
              onChange={e => setForm({
                ...form,
                business: {
                  ...form.business,
                  rooms: {
                    ...form.business?.rooms,
                    baths: e.target.value
                  }
                }
              })}
              autoComplete="off"
            />
          </div>
        </div>

        <input
          placeholder="Remarks (optional)"
          value={form.business?.rooms?.remarks || ""}
          className="max-width-360 mx-auto"
          onChange={e => setForm({
            ...form,
            business: {
              ...form.business,
              rooms: {
                ...form.business?.rooms,
                remarks: e.target.value
              }
            }
          })}
          autoComplete="off"
        />
        <br />

        <button className="btn-success" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
      <hr />

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
              value={form.password || ''}
              onChange={e => setForm(prev => ({
                ...prev,
                password: e.target.value,
              }))}
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
              value={form.confirmPassword || ''}
              onChange={e => setForm(prev => ({
                ...prev,
                confirmPassword: e.target.value
              }))}
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
      <hr />

      <div className="btn-group">
        <button className="btn-secondary" onClick={handleBack}>Back</button>
        <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Finish'}
        </button>
      </div>
    </div>
  );
}
