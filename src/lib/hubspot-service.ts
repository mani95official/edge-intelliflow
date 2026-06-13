import { HUBSPOT_CONFIG } from "@/config/hubspot";

export interface HubSpotSubmissionData {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  message?: string;
  [key: string]: any; // Allow custom keys
}

export async function submitHubSpotForm(
  formId: string,
  data: HubSpotSubmissionData
): Promise<boolean> {
  const portalId = HUBSPOT_CONFIG.portalId;
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  // Map data to fields array
  const fields = Object.entries(data).map(([name, value]) => {
    let valStr = "";
    if (Array.isArray(value)) {
      valStr = value.join(";");
    } else if (value !== undefined && value !== null) {
      valStr = String(value);
    }
    return { name, value: valStr };
  });

  const body = {
    fields,
    context: {
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName: typeof document !== "undefined" ? document.title : "",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HubSpot submission error:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("HubSpot network/request error:", error);
    return false;
  }
}
export { HUBSPOT_CONFIG };
