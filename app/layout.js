export const metadata = {
  title: "AlongsideYou.care",
  description: "Marketing site, app demo and booking form for AlongsideYou.care",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
