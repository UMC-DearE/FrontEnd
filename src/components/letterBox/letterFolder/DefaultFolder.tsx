import defaultFolderImage from '@/assets/letterPage/default-folder.svg';
import defaultFolderBlackImage from '@/assets/letterPage/default-folder-black.svg';

type Props = {
  alt: string;
  selected?: boolean;
};

export default function DefaultFolder({ alt, selected = false }: Props) {
  return (
    <img
      src={selected ? defaultFolderBlackImage : defaultFolderImage}
      alt={alt}
      className="h-full w-full object-contain"
    />
  );
}
