import type { DestinationKey } from "./destinations";

/**
 * Partner-school logos shown on /duhocquocte. Placeholder institutions —
 * illustrative only, swap for real partners + logo images later at
 * `public/images/partners/<id>.png`. School names are official/proper
 * nouns and stay unlocalized; the country label is derived from
 * `pages.global.destinations.<countryKey>.name` in the component.
 */
export interface PartnerSchool {
  id: string;
  name: string;
  countryKey: DestinationKey;
}

export const partnerSchools: PartnerSchool[] = [
  { id: "ntu-taiwan", name: "National Taiwan University", countryKey: "taiwan" },
  { id: "snu", name: "Seoul National University", countryKey: "korea" },
  { id: "waseda", name: "Waseda University", countryKey: "japan" },
  { id: "ntu-sg", name: "Nanyang Technological University", countryKey: "singapore" },
  { id: "amsterdam", name: "University of Amsterdam", countryKey: "europe" },
  { id: "manchester", name: "The University of Manchester", countryKey: "europe" },
  { id: "yonsei", name: "Yonsei University", countryKey: "korea" },
];
