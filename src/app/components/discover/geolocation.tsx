'use client';

import api from '@/lib/axios';
import { DiscoCard } from './card';
import Hospital from '@/model/hospital';
import { useAlert } from '@/contexts/alert-context';
import styles from '../../discover/page.module.css';
import Pagination from '@/app/assets/pagination';
import { countries, lgasInNigeria, majorCitiesByCountry, statesInNigeria } from '@/app/constants/locations';
import { RiGridFill, RiListOrdered } from 'react-icons/ri';
import { COUNTRY_FLAGS } from "@/app/constants/countryFlags";
import { useCallback, useEffect, useRef, useState } from 'react';
import { HospitalCard } from '../index/card';
import { mockHospitals } from '../dashboard/admin/mock-data';

const HOSPITAL_TYPES = ['public', 'private', 'teaching', 'clinic', 'specialist'];
const SCHEDULES = ['24/7', '8 hours (Mon - Fri)', '12-16 hours', '7 days'];

export default function Geolocation() {
  const { showAlert } = useAlert();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [position, setPosition] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [hospitals, setHospitals] = useState<HospitalCard[]>(mockHospitals);
  const [filters, setFilters] = useState({
    type: '',
    schedule: '',
    emergency: false,
    doctorOnSeat: false,
  });
  const [searchForSomeoneElse, setSearchForSomeoneElse] = useState(false);
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 6;

  const totalPages = Math.ceil(hospitals.length / hospitalsPerPage);
  const startIndex = (currentPage - 1) * hospitalsPerPage;
  const endIndex = startIndex + hospitalsPerPage;

  const statesOrCities = country === "Nigeria" ? statesInNigeria : majorCitiesByCountry[country] || [];
  const availableLgas = lgasInNigeria[state] || [];

  const hasFetchedPosition = useRef(false);

  const fetchNearbyHospitals = useCallback(async () => {
    if (!position.lat || !position.lng) {
      showAlert('info', 'Position not detected yet.');
      return;
    }

    const params = new URLSearchParams({
      lat: position.lat.toString(),
      lng: position.lng.toString(),
      radius: '5000',
      sort: 'distance',
      type: filters.type,
      schedule: filters.schedule,
      emergency: filters.emergency ? 'true' : 'false',
      doctorOnSeat: filters.doctorOnSeat ? 'true' : 'false',
    });

    try {
      const res = await api.get(`/api/hospitals/discover?${params.toString()}`);
      setHospitals(res.data.data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      showAlert('error', 'Failed to fetch hospitals.');
    }
  }, [position, filters, showAlert]);

  useEffect(() => {
    if (!navigator.geolocation || searchForSomeoneElse || hasFetchedPosition.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        hasFetchedPosition.current = true;
        // Do NOT auto-fetch here — wait for user to click "Search"
      },
      (err) => {
        console.error(err);
        showAlert('info', 'Unable to detect your location automatically. Please enter location manually.');
      }
    );
  }, [searchForSomeoneElse, showAlert]);

   const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = type === 'checkbox' && 'checked' in target ? target.checked : false;

    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className={styles.discover}>
      <div className={styles.header}>
        <h3>Discover By Preference</h3>
        <p>Allow location to find nearby providers or use filters</p>
      </div>

      <div className={styles.nearby}>
        <h4>
          Showing {hospitals.length} healthcare provider{hospitals.length === 1 ? '' : 's'} near you
        </h4>
        <p>Location results may vary — adjust your filters for the best match.</p>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.filterItem}>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">Types ▴ All</option>
            {HOSPITAL_TYPES.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <select name="schedule" value={filters.schedule} onChange={handleFilterChange}>
            <option value="">Schedules ▴ All</option>
            {SCHEDULES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className={`${styles.hasEmergency} bg-warning`}>
          <span>Doctor Active</span>
          <input
            type="checkbox"
            name="doctorOnSeat"
            checked={filters.doctorOnSeat}
            onChange={handleFilterChange}
          />
        </div>

        <div className={`${styles.hasEmergency} bg-danger`}>
          <span>Emergency</span>
          <input
            type="checkbox"
            name="emergency"
            checked={filters.emergency}
            onChange={handleFilterChange}
          />
        </div>

        <button className={styles.searchBtn} onClick={fetchNearbyHospitals}>
          Start Search
        </button>
      </div>

      <div className={styles.altSearch}>
        <span
          onClick={() => setSearchForSomeoneElse(!searchForSomeoneElse)}
          className={styles.altSearchToggle}
        >
          {searchForSomeoneElse ? 'Use automatic location instead' : 'Searching for someone else? Use a precise location'}
        </span>

        {searchForSomeoneElse && (
          <div className={styles.altSearch}>
            <input
              type="text"
              placeholder="Search by name or type"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.hospitalSearch}
            />

            <select value={country} onChange={(e) => setCountry(e.target.value)} className={styles.selectInput}>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select value={state} onChange={(e) => {
              setState(e.target.value);
              setLga("");
            }} className={styles.selectInput}>
              <option value="">Select {country === "Nigeria" ? "State" : "City"}</option>
              {statesOrCities.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className={styles.selectInput}
              disabled={country !== "Nigeria" || !lgasInNigeria[state]}
            >
              <option value="">Select Town/ LGA</option>
              {availableLgas.map((lga) => (
                <option key={lga} value={lga}>{lga}</option>
              ))}
            </select>

            <button className={`${styles.altSearchBtn} bg-warning`}>Search</button>
          </div>
        )}
      </div>

      {hospitals.length > 0 && <div className={styles.viewControls}>
        <button
          className={viewMode === 'list' ? `${styles.isActive} btn-tertiary` : 'btn-tertiary'}
          onClick={() => setViewMode('list')}
        >
          <RiListOrdered />
        </button>
        <button
          className={viewMode === 'grid' ? `${styles.isActive} btn-tertiary` : 'btn-tertiary'}
          onClick={() => setViewMode('grid')}
        >
          <RiGridFill />
        </button>
      </div>}

      <div className={styles.hospitalView}>
        <ul className={viewMode === 'grid' ? styles.grid : styles.list}>
          {hospitals.slice(startIndex, endIndex).map((hospital) => (
            <li key={hospital.id}>
              <DiscoCard hospital={hospital as HospitalCard} flag={COUNTRY_FLAGS[hospital?.address?.country ?? ''] || ''} />
            </li>
          ))}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
