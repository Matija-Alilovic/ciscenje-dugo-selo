"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  createJobPhoto,
  type JobPhoto,
  type JobPhotos,
  revokeJobPhoto,
} from "@/lib/employeeChecklistShare";

type PhotoSlotProps = {
  id: string;
  label: string;
  hint: string;
  photo: JobPhoto | null;
  onChange: (photo: JobPhoto | null) => void;
};

function PhotoSlot({ id, label, hint, photo, onChange }: PhotoSlotProps) {
  const inputId = `job-photo-${id}`;

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (photo) revokeJobPhoto(photo);
    onChange(createJobPhoto(file));
  };

  return (
    <div className="card-modern overflow-hidden">
      <div className="border-b border-gray-200 bg-brand-50/50 px-4 py-3 sm:px-5">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="mt-1 text-sm text-gray-600">{hint}</p>
      </div>
      <div className="p-4 sm:p-5">
        {photo ? (
          <div className="space-y-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <Image
                src={photo.previewUrl}
                alt={label}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor={inputId} className="btn-outline cursor-pointer px-4 py-2.5 text-center text-sm">
                Zamijeni fotku
              </label>
              <button
                type="button"
                onClick={() => {
                  revokeJobPhoto(photo);
                  onChange(null);
                }}
                className="btn-muted px-4 py-2.5 text-sm"
              >
                Ukloni
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-200 bg-brand-50/40 px-4 py-10 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/70",
            )}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-100 text-brand-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span className="mt-3 text-base font-semibold text-gray-900">Dodaj fotografiju</span>
            <span className="mt-1 text-sm text-gray-600">Kamera ili galerija</span>
          </label>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(event) => {
            handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

type EmployeeJobPhotosProps = {
  photos: JobPhotos;
  onChange: (photos: JobPhotos) => void;
};

export default function EmployeeJobPhotos({ photos, onChange }: EmployeeJobPhotosProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <PhotoSlot
        id="before"
        label="Fotografija prije *"
        hint="Stan prije čišćenja — kuhinja, kupaonica ili prostorija."
        photo={photos.before}
        onChange={(before) => onChange({ ...photos, before })}
      />
      <PhotoSlot
        id="after"
        label="Fotografija poslije *"
        hint="Isti kut nakon čišćenja — za usporedbu i kontrolu."
        photo={photos.after}
        onChange={(after) => onChange({ ...photos, after })}
      />
    </div>
  );
}
