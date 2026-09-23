import "../globals.css";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head><link rel="icon" href="/images/brand/logo-icon.png" type="image/png" /><link rel="shortcut icon" href="/images/brand/logo-icon.png" /><link rel="apple-touch-icon" href="/images/brand/logo-icon.png" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" /></head>
      <body>{children}</body>
    </html>
  );
}
