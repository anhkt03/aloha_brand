import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-wrap flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="sec-title">Trang không tồn tại</h1>
      <p className="sec-sub mt-2">Đường dẫn bạn tìm không có ở đây. Quay về trang chủ nhé.</p>
      <Link href="/" className="btn btn-primary mt-6">
        Về trang chủ
      </Link>
    </div>
  );
}
