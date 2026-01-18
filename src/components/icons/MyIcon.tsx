import myOutline from '@/assets/bottomNav/my-outline.svg';
import myFilled from '@/assets/bottomNav/my-filled.svg';

export default function UserIcon({ active = false, className }: { active?: boolean; className?: string }) {
  const src = active ? myFilled : myOutline;
  return <img src={src} className={className} alt="" aria-hidden="true" />;
}
