const ENV = import.meta.env.VITE_ENV as "LOCAL" | "DEV" | string;

let URL: string;

if (ENV === "LOCAL") {
  URL = "";
  console.log("USING ENV: LOCAL");
} else if (ENV === "DEV") {
  URL = import.meta.env.VITE_URL;
  console.log("USING ENV: DEV");
} else {
  console.warn(
    "WARN: No valid environment available, defaulting to localhost API"
  );
  URL = "";
}

export const API_URL_BASE: string = URL;
