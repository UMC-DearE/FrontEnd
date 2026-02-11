import defaultFolderImage from '@/assets/letterPage/default-folder.svg';

type Props = {
  alt: string;
};

export default function DefaultFolder({ alt }: Props) {
  return <img src={defaultFolderImage} alt={alt} className="w-[20px] h-[17px]" />;
}
