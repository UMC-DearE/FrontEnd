import reportOutline from '../../assets/bottomNav/report-outline.svg';
import reportFilled from '../../assets/bottomNav/report-filled.svg';

export default function ReportIcon({ active = false, className }: { active?: boolean; className?: string }) {
  const src = active ? reportFilled : reportOutline;
  return <img src={src} className={className} alt="" aria-hidden="true" />;
}
