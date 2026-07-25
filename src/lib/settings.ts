export interface SiteSettings {
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  aboutTitle: string;
  aboutCeoName: string;
  aboutCeoRole: string;
  aboutCeoDesc: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
}

export const defaultSettings: SiteSettings = {
  heroTitle1: "Building Dreams.",
  heroTitle2: "Creating Landmarks.",
  heroSubtitle: "Premium Construction & Interior Solutions in Tamil Nadu.",
  heroBackgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
  aboutTitle: "Engineering Excellence Built on Trust",
  aboutCeoName: "Er. D. Kaviyarasu",
  aboutCeoRole: "CEO & Founder",
  aboutCeoDesc: "Leading Kavi Builders with a strong commitment to quality, transparency, and engineering excellence in every project we undertake.",
  contactAddress: "No.310, TVK Nagar, Back to Ramraj Cotton, Harur - 636 903, Dharmapuri.",
  contactPhone: "+91 9095332296",
  contactEmail: "Kavibuilders77@gmail.com",
};

export function getSiteSettings(): SiteSettings {
  const saved = localStorage.getItem("kavi_site_settings");
  if (saved) {
    try {
      return { ...defaultSettings, ...JSON.parse(saved) };
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
}

export function saveSiteSettings(settings: SiteSettings) {
  localStorage.setItem("kavi_site_settings", JSON.stringify(settings));
  window.dispatchEvent(new Event("settings-updated"));
}
