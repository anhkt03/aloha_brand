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
  /** Tỉnh / thành phố — dùng để nhóm & hiển thị. */
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
  { code: "CS1", city: "Hưng Yên", address: "Bến xe Mỹ Hào, thị xã Mỹ Hào, Hưng Yên", x: 30, y: 19 },
  { code: "CS2", city: "Hải Dương", address: "195 Phạm Văn Đồng, Thanh Bình, Hải Dương", x: 33, y: 19 },
  { code: "CS3", city: "Hưng Yên", address: "Yên Lịch, Dân Tiến, Khoái Châu, Hưng Yên", x: 29, y: 20 },
  { code: "CS4", city: "Hà Nội", address: "Khu Đô thị mới Cầu Giấy, Dịch Vọng, Cầu Giấy, Hà Nội", x: 27, y: 17 },
  { code: "CS5", city: "Hải Dương", address: "241 Thống Nhất, Bình Giang, Hải Dương", x: 32, y: 20 },
  { code: "CS6", city: "Hải Phòng", address: "409 Máng Nước, An Đồng, An Dương, Hải Phòng", x: 37, y: 19 },
  { code: "CS7", city: "Bắc Ninh", address: "982 Đường Quang Trung, Quế Võ, Bắc Ninh", x: 31, y: 17 },
  { code: "CS8", city: "Hải Dương", address: "2/15 phố Gia Phúc, Phương Điểm 1, Gia Lộc, Hải Dương", x: 34, y: 20 },
  { code: "CS9", city: "Thái Nguyên", address: "348A Phan Đình Phùng, Thái Nguyên", x: 25, y: 14 },
  { code: "CS10", city: "Vĩnh Phúc", address: "Vĩnh Yên, Vĩnh Phúc", x: 24, y: 16 },
];

/**
 * Prefer the branch's real `mapUrl`; fall back to a Google Maps search
 * scoped to the branch address so the pin is still clickable.
 */
export function branchMapUrl(branch: Branch): string {
  if (branch.mapUrl) return branch.mapUrl;
  const query = encodeURIComponent(`ALOHA Language School ${branch.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
