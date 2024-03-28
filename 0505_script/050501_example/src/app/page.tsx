import Script from 'next/script';

export default async function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Script
        id="legal-age"
        strategy="beforeInteractive"
        src="https://api.origamid.online/scripts/idade-legal.min.js"
      />
      <Script
        id="google-tag-script"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"
      ></Script>
      <Script id="google-tag">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXX');
  `}
      </Script>
    </main>
  );
}
