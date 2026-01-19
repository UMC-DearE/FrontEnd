import homeOutline from '@/assets/bottomNav/home-outline.svg';
import homeFilled from '@/assets/bottomNav/home-filled.svg';

export default function HomeIcon({ active = false, className }: { active?: boolean; className?: string }) {
  const src = active ? homeFilled : homeOutline;
  return <img src={src} className={className} alt="" aria-hidden="true" />;
}
