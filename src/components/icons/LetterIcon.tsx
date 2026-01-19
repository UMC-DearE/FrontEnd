import letterOutline from '@/assets/bottomNav/letter-outline.svg';
import letterFilled from '@/assets/bottomNav/letter-filled.svg';

export default function MailIcon({ active = false, className }: { active?: boolean; className?: string }) {
  const src = active ? letterFilled : letterOutline;
  return <img src={src} className={className} alt="" aria-hidden="true" />;
}
