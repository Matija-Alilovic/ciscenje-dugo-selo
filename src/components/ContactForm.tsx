'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { CLEANING_TYPES } from '@/lib/constants';
import {
  CALCULATOR_PREFILL_EVENT,
  clearCalculatorPrefill,
  readCalculatorPrefill,
  type CalculatorPrefill,
} from '@/lib/calculatorPrefill';
import { buildWhatsAppInquiryMessage, openWhatsApp } from '@/lib/utils';

export default function ContactForm() {
  const [kvadratura, setKvadratura] = useState('');
  const [vrsta, setVrsta] = useState('');
  const [poruka, setPoruka] = useState('');
  const [fromCalculator, setFromCalculator] = useState(false);

  useEffect(() => {
    function applyPrefill(prefill: CalculatorPrefill) {
      if (prefill.kvadratura) {
        setKvadratura(prefill.kvadratura);
      }

      if (
        prefill.vrsta &&
        CLEANING_TYPES.includes(prefill.vrsta as (typeof CLEANING_TYPES)[number])
      ) {
        setVrsta(prefill.vrsta);
      }

      if (prefill.poruka) {
        setPoruka(prefill.poruka);
      }

      setFromCalculator(true);
      clearCalculatorPrefill();
    }

    const stored = readCalculatorPrefill();
    if (stored) {
      applyPrefill(stored);
    }

    function onPrefill(event: Event) {
      applyPrefill((event as CustomEvent<CalculatorPrefill>).detail);
    }

    window.addEventListener(CALCULATOR_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CALCULATOR_PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (!fromCalculator) return;
    document.getElementById("ime")?.focus({ preventScroll: true });
  }, [fromCalculator]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = buildWhatsAppInquiryMessage({
      ime: String(formData.get('ime') ?? ''),
      mobitel: String(formData.get('mobitel') ?? ''),
      lokacija: String(formData.get('lokacija') ?? ''),
      kvadratura: String(formData.get('kvadratura') ?? ''),
      vrsta: String(formData.get('vrsta') ?? ''),
      poruka: String(formData.get('poruka') ?? ''),
    });

    openWhatsApp(message);
    setFromCalculator(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fromCalculator && (
        <p className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-800">
          Podaci iz kalkulatora su uneseni u formu. Dopunite ime, mobitel i lokaciju pa
          pošaljite upit.
        </p>
      )}
      <div>
        <label
          htmlFor="ime"
          className="mb-1 block text-base font-medium text-gray-700"
        >
          Ime
        </label>
        <input
          id="ime"
          name="ime"
          type="text"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label
          htmlFor="mobitel"
          className="mb-1 block text-base font-medium text-gray-700"
        >
          Broj mobitela
        </label>
        <input
          id="mobitel"
          name="mobitel"
          type="tel"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label
          htmlFor="lokacija"
          className="mb-1 block text-base font-medium text-gray-700"
        >
          Lokacija
        </label>
        <input
          id="lokacija"
          name="lokacija"
          type="text"
          placeholder="npr. Dugo Selo, Sesvete..."
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label
          htmlFor="kvadratura"
          className="mb-1 block text-base font-medium text-gray-700"
        >
          Kvadratura stana
        </label>
        <input
          id="kvadratura"
          name="kvadratura"
          type="text"
          placeholder="npr. 65 m²"
          value={kvadratura}
          onChange={(e) => setKvadratura(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label
          htmlFor="vrsta"
          className="mb-1 block text-base font-medium text-gray-700"
        >
          Vrsta čišćenja
        </label>
        <select
          id="vrsta"
          name="vrsta"
          required
          value={vrsta}
          onChange={(e) => setVrsta(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          <option value="">Odaberite...</option>
          {CLEANING_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="poruka"
          className="mb-1 block text-base font-medium text-gray-700"
        >
          Poruka
        </label>
        <textarea
          id="poruka"
          name="poruka"
          rows={4}
          placeholder="Kratko napišite što treba očistiti, stanje prostora, željeni termin..."
          value={poruka}
          onChange={(e) => setPoruka(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Pošalji upit
      </button>
    </form>
  );
}
