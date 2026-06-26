export const HUBSPOT_CONFIG = {
  portalId: (import.meta.env.VITE_HUBSPOT_PORTAL_ID || "48729381").trim(),
  contactFormId: (import.meta.env.VITE_HUBSPOT_CONTACT_FORM_ID || "a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6").trim(),
  trainingFormId: (import.meta.env.VITE_HUBSPOT_TRAINING_FORM_ID || "f1e2d3c4-b5a6-7988-9900-112233445566").trim(),
  region: (import.meta.env.VITE_HUBSPOT_REGION || "").trim(),
};
