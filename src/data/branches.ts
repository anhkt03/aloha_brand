/**
 * Branch directory — mirrors the `Branch` Prisma model. The `x`/`y`
 * fields are pin positions on the stylised Vietnam SVG map (percentage,
 * 0–100). Real coordinates come from BE later; here we approximate by
 * city so pins land in roughly the right place.
 *
 * `mapUrl` should be a full Google Maps link once you have it; leave it
 * empty and `branchMapUrl()` will fall back to a search URL.
 */
export interface Branch {
  code: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  mapUrl?: string;
  /** Pin X coordinate on the SVG map (0–100). */
  x: number;
  /** Pin Y coordinate on the SVG map (0–100). */
  y: number;
}

export const branches: Branch[] = [
  { code: "CS1", name: "Cầu Giấy", city: "Hà Nội", address: "123 Trần Duy Hưng, Cầu Giấy, Hà Nội", phone: "024 3555 1234", x: 27, y: 17 },
  { code: "CS2", name: "Hải Dương", city: "Hải Dương", address: "56 Trần Hưng Đạo, TP. Hải Dương", phone: "0220 3555 456", x: 34, y: 18 },
  { code: "CS3", name: "Long Biên", city: "Hà Nội", address: "88 Nguyễn Văn Cừ, Long Biên, Hà Nội", phone: "024 3888 3333", x: 30, y: 17 },
  { code: "CS4", name: "Đống Đa", city: "Hà Nội", address: "12 Xã Đàn, Đống Đa, Hà Nội", phone: "024 3573 4444", x: 27, y: 18 },
  { code: "CS5", name: "Bắc Ninh", city: "Bắc Ninh", address: "45 Nguyễn Trãi, TP. Bắc Ninh", phone: "0222 3555 555", x: 32, y: 16 },
  { code: "CS6", name: "Hải Phòng", city: "Hải Phòng", address: "22 Lạch Tray, Ngô Quyền, Hải Phòng", phone: "0225 3555 666", x: 38, y: 19 },
  { code: "CS7", name: "Thanh Xuân", city: "Hà Nội", address: "156 Nguyễn Trãi, Thanh Xuân, Hà Nội", phone: "024 3555 7777", x: 26, y: 19 },
  { code: "CS8", name: "Hà Đông", city: "Hà Nội", address: "78 Quang Trung, Hà Đông, Hà Nội", phone: "024 3388 8888", x: 25, y: 20 },
  { code: "CS9", name: "Nam Định", city: "Nam Định", address: "34 Trần Hưng Đạo, TP. Nam Định", phone: "0228 3555 999", x: 28, y: 22 },
  { code: "CS10", name: "Bắc Giang", city: "Bắc Giang", address: "12 Ngô Gia Tự, TP. Bắc Giang", phone: "0204 3555 010", x: 32, y: 14 },
];

/**
 * Prefer the branch's real `mapUrl`; fall back to a Google Maps search
 * scoped to the branch name + address so the pin is still clickable.
 */
export function branchMapUrl(branch: Branch): string {
  if (branch.mapUrl) return branch.mapUrl;
  const query = encodeURIComponent(`ALOHA Language School ${branch.name} ${branch.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
