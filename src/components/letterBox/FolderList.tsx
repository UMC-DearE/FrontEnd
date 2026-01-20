import likeIcon from '@/assets/letterFolder/likeIcon.svg';
import plusIcon from '@/assets/letterFolder/plusIcon.svg';
import folderSetIcon from '@/assets/letterFolder/folderSetIcon.svg';

export type FolderType = {
  id: number | string;
  name: string;
  imgUrl?: string;
};

interface FolderListProps {
  folders: FolderType[];
  selectedId: number | string;
  onSelect: (id: number | string) => void;
  onFolderAdd: () => void;
  onOpenFolderSetting: (folderId: number | string) => void;
}

export default function FolderList({
  folders,
  selectedId,
  onSelect,
  onFolderAdd,
  onOpenFolderSetting,
}: FolderListProps) {
  return (
    <div className="flex gap-[10px] px-4 py-5 overflow-x-auto no-scrollbar">
      <div className="flex flex-col items-center gap-2 shrink-0" onClick={() => onSelect('all')}>
        <button
          className={`flex items-center justify-center w-[50px] h-[50px] rounded-[10px] cursor-pointer ${selectedId === 'all' ? 'bg-black' : 'bg-white border-[#E6E7E9] border-[1.2px]'}`}
        >
          <p
            className={`text-[14px] font-semibold ${selectedId === 'all' ? 'text-white' : 'text-[#C2C4C7]'}`}
          >
            ALL
          </p>
        </button>
        <p
          className={`text-[12px] ${selectedId === 'all' ? 'text-black font-semibold' : 'text-[#C2C4C7]'}`}
        >
          전체
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 shrink-0" onClick={() => onSelect('like')}>
        <button
          className={`flex items-center justify-center w-[50px] h-[50px] rounded-[10px] cursor-pointer ${selectedId === 'like' ? 'bg-black' : 'bg-white border-[#E6E7E9] border-[1.2px]'}`}
        >
          <img
            src={likeIcon}
            alt="like-icon"
            className={selectedId === 'like' ? 'brightness-0 invert' : ''}
          />
        </button>
        <p
          className={`text-[12px] ${selectedId === 'like' ? 'text-black font-semibold' : 'text-[#C2C4C7]'}`}
        >
          좋아요
        </p>
      </div>

      {folders.map((folder) => {
        const isSelected = selectedId === folder.id;

        return (
          <div
            key={folder.id}
            className="flex flex-col items-center gap-[8px] shrink-0"
            onClick={() => onSelect(folder.id)}
          >
            <div className="relative w-[50px] h-[50px]">
              <button
                className={`
            flex items-center justify-center w-[50px] h-[50px] rounded-[10px] overflow-hidden transition-all cursor-pointer
            ${
              selectedId === folder.id
                ? 'shadow-[0px_3px_4px_0px_rgba(0,0,0,0.15)]'
                : 'border-[#E6E7E9] border-[1.2px] bg-white'
            }
          `}
                type="button"
              >
                {folder.imgUrl ? (
                  <img
                    src={folder.imgUrl}
                    alt={folder.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p
                    className={`text-[14px] ${isSelected ? 'text-black font-bold' : 'text-[#C2C4C7]'}`}
                  >
                    {folder.name[0]}
                  </p>
                )}
              </button>

              {isSelected && (
                <div
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenFolderSetting(folder.id);
                  }}
                  className="absolute w-[14px] h-[14px] rounded-[40px] left-[40px] bottom-[39px] bg-[#555557] flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={folderSetIcon}
                    alt="folder-setting-icon"
                    className="w-2 h-2 pointer-events-none"
                  />
                </div>
              )}
            </div>

            <p
              className={`text-[12px] transition-colors ${isSelected ? 'text-black font-semibold' : 'text-[#C2C4C7]'}`}
            >
              {folder.name}
            </p>
          </div>
        );
      })}

      <div className="flex flex-col items-center gap-2 shrink-0" onClick={onFolderAdd}>
        <button className="flex items-center justify-center w-[50px] h-[50px] bg-white border-[#E6E7E9] border-[1.2px] rounded-[10px] cursor-pointer">
          <img src={plusIcon} alt="plus-icon" />
        </button>
        <p className="text-[12px] text-[#C2C4C7]">추가</p>
      </div>
    </div>
  );
}
