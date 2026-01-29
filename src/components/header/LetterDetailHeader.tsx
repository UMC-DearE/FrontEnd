// 편지 상세 헤더

import TopSection from "@/components/header/TopSection";
import BackButton from "../common/header/BackButton";
import morebar from "@/assets/header/morebar.svg";

export default function LetterDetailHeader() {

  return (
    <>
      <TopSection
        left={<BackButton to="/letter" />}
        center={<div className="text-lg font-semibold">편지 상세</div>}
        right={
            <div className="flex items-center justify-center mr-2">
              <button
                type="button"
                className="text-base font-medium text-primary"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-letter-more'));
                }}
              >
                <img src={morebar} alt="more" />
              </button>
            </div>
        }
      />
    </>
  );
}