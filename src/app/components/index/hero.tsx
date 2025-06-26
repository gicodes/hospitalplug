'use client';

import React, { useState } from "react";
import styles from "../../page.module.css";
import { BsFillPlugFill } from "react-icons/bs";
import { SiWorldhealthorganization } from "react-icons/si";
import {
  countries,
  statesInNigeria,
  majorCitiesByCountry,
  lgasInNigeria
} from '../../assets/locations';

const Hero = () => {
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [query, setQuery] = useState("");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    setState("");
    setLga("");
  };

  const statesOrCities =
    country === "Nigeria" ? statesInNigeria : majorCitiesByCountry[country] || [];

  const availableLgas = lgasInNigeria[state] || [];

  return (
    <div className={styles.hero}>
     <div id="hero-text">
        <div className={`${styles.heroText} text-center`}>
          <h2>
            Let&#39;s connect y<SiWorldhealthorganization size={25} />u
          </h2>
          <h2>
            to healthcare services <BsFillPlugFill />
          </h2>
          <h4>Find Top Hospitals・Book Service・Reserve Care・Follow up</h4>
        </div>
      </div>

      <div id="hero-search">
        <div className={styles.searchContainer}>
          <p>Search for hospitals, care centers and medical professionals near you</p>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search hospital by name or type"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.hospitalSearch}
            />

            <select
              value={country}
              onChange={handleCountryChange}
              className={styles.selectInput}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setLga("");
              }}
              className={styles.selectInput}
            >
              <option value="">Select {country === "Nigeria" ? "State" : "City"}</option>
              {statesOrCities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className={styles.selectInput}
              disabled={country !== "Nigeria" || !lgasInNigeria[state]}
            >
              <option value="">Select Town/ LGA</option>
              { availableLgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          
            <button className="btn-primary"> Search</button>
            </div>
          </div>
        </div>
      </div>
  );
};


export default Hero;