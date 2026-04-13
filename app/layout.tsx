export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Quito Fresh | Premium</title>
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
