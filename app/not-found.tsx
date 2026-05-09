import Link from 'next/link';
import NavbarV2 from './components/v2/NavbarV2';
import FooterV2 from './components/v2/FooterV2';

export default function NotFound() {
  return (
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen antialiased">
      <NavbarV2 />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-freight text-[clamp(3rem,8vw,6rem)] font-normal leading-[1] text-white mb-4">404</h1>
          <h2 className="text-lg text-white/60 mb-2">Page Not Found</h2>
          <p className="text-sm text-white/60 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link
            href="/"
            className="inline-block bg-white text-navy px-6 py-2 rounded-[75px] font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
}
