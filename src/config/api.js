const envUrl = import.meta.env.VITE_API_URL;

let base = envUrl && envUrl.trim().length > 0 ? envUrl.trim() : "http://localhost:8080/api";

// Remove trailing slash if present
if (base.endsWith("/")) {
  base = base.slice(0, -1);
}

// Automatically append /api if the user provided root backend URL
if (!base.endsWith("/api")) {
  base = `${base}/api`;
}

export const API_BASE = base;
export default API_BASE;
