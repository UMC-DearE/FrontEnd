import { useLocation } from 'react-router-dom';
import TopSection from './TopSection';
import BackButton from '../common/header/BackButton';
import type { JSX } from 'react';

type LocationState = { folderName?: string } | null;

export default function LetterSelectHeader(): JSX.Element {
  const location = useLocation();
  const state = location.state as LocationState;
  const folderName = state?.folderName ?? '';

  return (
    <TopSection
      left={<BackButton />}
      center={
        <div className="flex items-center text-lg font-semibold leading-none text-primary">
          {folderName}
        </div>
      }
    />
  );
}
