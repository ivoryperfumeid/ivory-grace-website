import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="text-2xl md:text-3xl font-headline font-bold text-foreground hover:text-accent transition-colors">
      Ivory & Grace
    </Link>
  );
};

export default Logo;
