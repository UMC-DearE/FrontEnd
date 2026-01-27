import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHarmoniousTextColor } from "@/utils/color";
import type { CreateResultPayload } from "@/types/create";
import type { CreateFrom } from "@/types/from";
import ColorPicker from "@/assets/create/color-picker.svg";
import { HexColorPicker } from "react-colorful";
import Plusbtn from "@/assets/create/plusbtn.svg";
import { FromBadge } from "@/components/common/FromBadge";
import { InputField } from "@/components/common/InputField";
import erasebtn from "@/assets/create/erasebtn.svg";

type FromItem = CreateFrom & { fromId: number };

export default function SetFromPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CreateResultPayload | null;

  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FEEFEF");
  const [showPicker, setShowPicker] = useState(false);

  const [fromList, setFromList] = useState<FromItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 기존 From 목록 불러오기 api 호출
  useEffect(() => {
    const fetchFromList = async () => {
      const res: FromItem[] = [
        { fromId: 1, name: "엄마", backgroundColor: "#FEEFEF", textColor: "#333333" },
        { fromId: 2, name: "아빠", backgroundColor: "#EAF6FF", textColor: "#333333" },
      ];
      setFromList(res);
      setLoading(false);
    };

    fetchFromList();
  }, []);

  // 생성 또는 선택한 From을 가지고 뒤로 이동 + 상태만 전달해서 바로 UI에 반영 +  뒤로 가기 해도 다시 프롬 선택 페이지 안 뜨게
  const goBackWithDraft = (draft: CreateFrom) => {
    navigate("/create/detail", {
      replace: true,
      state: {
        ...(state ?? {}),
        selectedFromDraft: draft,
      },
    });
  };

  const handleCreate = () => {
    if (!input.trim()) return;

    const draft: CreateFrom = {
      name: input.trim(),
      backgroundColor: selectedColor,
      textColor: getHarmoniousTextColor(selectedColor),
    };

    goBackWithDraft(draft);
  };

  const handleSelect = (from: FromItem) => {
    goBackWithDraft({
      name: from.name,
      backgroundColor: from.backgroundColor,
      textColor: from.textColor,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-0 mt-3 px-0">
          <InputField
            value={input}
            onChange={(v) => setInput(v)}
            placeholder="이름을 생성하거나 선택하세요"
            useGrayWhenBlurred
            inputClassName="h-[50px] rounded-xl px-4 text-base font-medium outline-none cursor-text focus:bg-white focus:ring-1 focus:ring-primary"
            rightElement={
              input ? (
                <button
                  onClick={() => setInput("")}
                  className="flex items-center justify-center w-6 h-6"
                >
                  <img src={erasebtn} alt="clear" />
                </button>
              ) : undefined
            }
          />
      </div>

      <div className="p-4 mt-3">
        <div className="text-sm text-[#555557] font-medium mb-4">기존 목록</div>

        <div className="flex flex-col gap-5">
          {fromList.map((from) => (
            <div key={from.fromId} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FromBadge name={from.name} backgroundColor={from.backgroundColor} />
              </div>
              <button
                onClick={() => handleSelect(from)}
                className="text-sm font-normal text-[#9D9D9F] border border-[#C2C4C7] rounded-lg px-[10px] py-[2px]"
              >
                선택
              </button>
            </div>
          ))}
        </div>
      </div>

      {input && (
        <div className="mt-4 p-4">
          <div className="flex mb-4 gap-2">
            <div className="text-sm font-medium text-primary">새로운 From 추가</div>
            <div className="text-sm font-medium text-[#9D9D9F]">(색상 선택)</div>
          </div>

          <div className="relative flex gap-3 mb-6 mt-4">
            {["#FFE2DD", "#FFF3C4", "#EAF5FF", "#E4F7EB"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-[32px] h-[32px] rounded-full border-2 ${
                  selectedColor === c ? "border-black scale-110" : "border-transparent"
                }`}
                style={{ background: c }}
              />
            ))}
            <button
              onClick={() => setShowPicker((s) => !s)}
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
            >
              <img src={ColorPicker} alt="upload" className="w-[32px] h-[32px]" />
            </button>

            {showPicker && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-40">
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <HexColorPicker color={selectedColor} onChange={(c) => setSelectedColor(c)} />
                  <div className="mt-2 flex items-center gap-2 justify-between">
                    <input
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-28 rounded border px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => setShowPicker(false)}
                      className="px-3 py-1 rounded bg-gray-100 text-sm"
                    >
                      선택
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={handleCreate} className="flex items-center gap-2 font-medium text-base text-primary">
            <img src={Plusbtn} alt="upload" />
            <FromBadge name={input} backgroundColor={selectedColor} />
            생성하기
          </button>
        </div>
      )}
    </div>
  );
}
