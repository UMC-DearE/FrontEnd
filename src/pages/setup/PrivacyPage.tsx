type TermSection = {
  title: string;
  content: string;
};

const MOCK_PRIVACY_TERMS: TermSection[] = [
  {
    title: '제 1조(목적)',
    content:
      `dear.e(이하 "회사"라 함)는 회사가 제공하는 서비스(이하 "회사 서비스")를 이용하는 개인(이하 "이용자" 또는 "개인")의 개인정보를 보호하기 위해 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 "정보통신망법") 등 관련 법령을 준수하고, 서비스 이용자의 개인정보 보호와 관련된 고충을 신속하고 원활하게 처리할 수 있도록 하기 위해 다음과 같이 개인정보처리방침(이하 "본 방침")을 수립합니다.`,
  },
  {
    title: '제 2조(정의)',
    content: `개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.`,
  },
  {
    title: '제 3조(본 방침의 공개)',
    content:
      `1. 회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을 공개하고 있습니다.
2. 회사는 제 1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.`,
  },
  {
    title: '제 4조(본 방침의 변경)',
    content: `1. 본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.
2. 회사는 제 1항에 따라 본 방침을 개정하는 경우 회사가 운영하는 인터넷 홈페이지의 첫 화면 공지사항 또는 별도의 창, 전자우편 등의 방법으로 이용자에게 공지합니다.
3. 회사는 개정 시행일로부터 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <main className="pb-[110px] pt-[12px]">
        <div className="space-y-[28px]">
          {MOCK_PRIVACY_TERMS.map((section) => (
            <section key={section.title}>
              <h2 className="text-[16px] font-semibold leading-[150%] text-[#121212]">
                {section.title}
              </h2>

              <p className="mt-[8px] whitespace-pre-line text-[14px] font-normal leading-[150%] text-[#737478]">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}