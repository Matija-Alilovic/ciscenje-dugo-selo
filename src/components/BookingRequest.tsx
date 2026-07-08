"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { BOOKING_AREAS, BOOKING_TIME_SLOTS } from "@/lib/constants";
import { buildBookingWhatsAppMessage, cn, openWhatsApp } from "@/lib/utils";

function formatDateLabel(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("hr-HR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ChoiceChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-brand-600 bg-brand-50 text-brand-800 dark:bg-brand-50/20 dark:text-brand-300"
          : "border-gray-300 bg-surface text-gray-700 hover:border-brand-200 hover:bg-brand-50/50",
      )}
    >
      {children}
    </button>
  );
}

export type BookingRequestFormProps = {
  idPrefix?: string;
  defaultVrsta?: string;
  procjenaCijena?: string;
  procjenaDetalji?: string[];
  onSubmitSuccess?: () => void;
};

export default function BookingRequestForm({
  idPrefix = "booking",
  defaultVrsta = "",
  procjenaCijena,
  procjenaDetalji,
  onSubmitSuccess,
}: BookingRequestFormProps) {
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [podrucje, setPodrucje] = useState<string>(BOOKING_AREAS[0]);
  const [adresa, setAdresa] = useState("");
  const [datum, setDatum] = useState("");
  const [termin, setTermin] = useState("");
  const [napomena, setNapomena] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!termin) {
      setError("Odaberite željeno vrijeme dolaska.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const terminLabel =
      BOOKING_TIME_SLOTS.find((slot) => slot.value === termin)?.label ?? termin;

    const message = buildBookingWhatsAppMessage({
      ime: String(formData.get("ime") ?? ""),
      mobitel: String(formData.get("mobitel") ?? ""),
      podrucje,
      adresa: adresa.trim(),
      datum: formatDateLabel(datum) || datum,
      termin: terminLabel,
      vrsta: defaultVrsta,
      napomena,
      procjenaCijena,
      procjenaDetalji,
    });

    openWhatsApp(message);
    onSubmitSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-500">
        Nije automatska rezervacija — potvrđujemo termin na WhatsAppu.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-ime`} className="form-label">
            Ime
          </label>
          <input
            id={`${idPrefix}-ime`}
            name="ime"
            type="text"
            required
            className="form-field"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-mobitel`} className="form-label">
            Broj mobitela
          </label>
          <input
            id={`${idPrefix}-mobitel`}
            name="mobitel"
            type="tel"
            required
            className="form-field"
          />
        </div>
      </div>

      <div>
        <p className="form-label">Područje</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {BOOKING_AREAS.map((area) => (
            <ChoiceChip
              key={area}
              selected={podrucje === area}
              onClick={() => setPodrucje(area)}
            >
              {area}
            </ChoiceChip>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-adresa`} className="form-label">
          Adresa ili točnije mjesto
        </label>
        <input
          id={`${idPrefix}-adresa`}
          name="adresa"
          type="text"
          required
          placeholder="npr. ulica, kućni broj, kat..."
          value={adresa}
          onChange={(event) => setAdresa(event.target.value)}
          className="form-field"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-datum`} className="form-label">
            Željeni datum
          </label>
          <input
            id={`${idPrefix}-datum`}
            name="datum"
            type="date"
            required
            min={minDate}
            value={datum}
            onChange={(event) => setDatum(event.target.value)}
            className="form-field"
          />
        </div>
        <div>
          <p className="form-label">Željeno vrijeme</p>
          <div className="mt-2 grid gap-2">
            {BOOKING_TIME_SLOTS.map((slot) => (
              <ChoiceChip
                key={slot.value}
                selected={termin === slot.value}
                onClick={() => setTermin(slot.value)}
              >
                {slot.label}
              </ChoiceChip>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-napomena`} className="form-label">
          Napomena (opcionalno)
        </label>
        <textarea
          id={`${idPrefix}-napomena`}
          rows={2}
          placeholder="npr. pristup zgradi, kućni ljubimci..."
          value={napomena}
          onChange={(event) => setNapomena(event.target.value)}
          className="form-field"
        />
      </div>

      {error && (
        <p className="text-sm text-red-700 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Pošalji zahtjev za termin na WhatsApp
      </button>
    </form>
  );
}
