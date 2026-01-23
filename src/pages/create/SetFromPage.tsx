import { useLocation, useNavigate } from "react-router-dom";
import type { CreateResultPayload } from "@/types/create";

export default function SetFromPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location as { state: CreateResultPayload | null };

  const list = ["엄마", "아빠", "이름테스트"];

  const handleSelect = (name: string) => {
    // 전달받은 기존 값 유지 + 선택한 selectedRecipient 추가 + 상세 페이지로 다시 이동
    const nextState = { ...(state ?? {}), selectedRecipient: name };
    navigate("/create/detail", { state: nextState });
  };

  return (
    <div className="flex flex-col h-full">
      <input type="text" placeholder="이름을 생성하거나 입력하세요"
      className="w-full bg-[#F7F7F7] h-[50px] border border-[#C2C4C7] rounded-xl px-4 mt-3 text-base font-medium outline-none flex items-center justify-between cursor-pointer focus:ring-1 focus:ring-primary focus:bg-white"/>
      <div className="p-4 mt-3">
        <h1 className="text-sm text-[#555557] font-medium mb-4">기존 목록</h1>

        <div className="flex flex-col gap-5">
          {list.map((name) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-[11px] py-[4px] bg-[#FEEFEF] rounded-lg text-primary text-sm font-medium">{name}</span>
              </div>
              <button
                onClick={() => handleSelect(name)}
                className="text-sm font-normal text-[#9D9D9F] border border-[#C2C4C7] rounded-lg px-[10px] py-[2px]"
              >
                선택
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}