import type { DestinationKey } from "./destinations";

/**
 * Partner-school photos shown on /duhocquocte. School names are
 * official/proper nouns and stay unlocalized; the country label is
 * derived from `pages.global.destinations.<countryKey>.name` in the
 * component. `image` files live at `public/images/partners/<id>.jpg`.
 */
export interface PartnerSchool {
  id: string;
  name: string;
  countryKey: DestinationKey;
  image: string;
}

export const partnerSchools: PartnerSchool[] = [
  { id: "ntu-taiwan", name: "National Taiwan University", countryKey: "taiwan", image: "/images/partners/ntu-taiwan.jpg" },
  { id: "snu", name: "Seoul National University", countryKey: "korea", image: "/images/partners/snu.jpg" },
  { id: "waseda", name: "Waseda University", countryKey: "japan", image: "/images/partners/waseda.jpg" },
  { id: "ntu-sg", name: "Nanyang Technological University", countryKey: "singapore", image: "/images/partners/ntu-sg.jpg" },
  { id: "amsterdam", name: "University of Amsterdam", countryKey: "europe", image: "/images/partners/amsterdam.jpg" },
  { id: "yonsei", name: "Yonsei University", countryKey: "korea", image: "/images/partners/yonsei.jpg" },
];
