import { openManagerWhatsApp } from "./utils";

export type JobPhoto = {
  file: File;
  previewUrl: string;
};

export type JobPhotos = {
  before: JobPhoto | null;
  after: JobPhoto | null;
};

function photoFileName(label: "prije" | "poslije", file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  return `ciscenje-${label}.${extension}`;
}

export function createJobPhoto(file: File): JobPhoto {
  return {
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

export function revokeJobPhoto(photo: JobPhoto | null) {
  if (photo) URL.revokeObjectURL(photo.previewUrl);
}

export function revokeJobPhotos(photos: JobPhotos) {
  revokeJobPhoto(photos.before);
  revokeJobPhoto(photos.after);
}

export function jobPhotosComplete(photos: JobPhotos) {
  return Boolean(photos.before && photos.after);
}

export async function shareChecklistOnWhatsApp(
  message: string,
  photos: JobPhotos,
): Promise<"shared" | "fallback"> {
  if (!photos.before || !photos.after) {
    throw new Error("Missing photos");
  }

  const files = [
    new File([photos.before.file], photoFileName("prije", photos.before.file), {
      type: photos.before.file.type || "image/jpeg",
    }),
    new File([photos.after.file], photoFileName("poslije", photos.after.file), {
      type: photos.after.file.type || "image/jpeg",
    }),
  ];

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      const payload = { files, text: message, title: "Izvjestaj ciscenja" };
      if (!navigator.canShare || navigator.canShare({ files, text: message })) {
        await navigator.share(payload);
        return "shared";
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }
    }
  }

  openManagerWhatsApp(message);
  return "fallback";
}
