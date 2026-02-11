# 💌 Dear.e
> **아날로그의 온기를 스마트하게, 편지 아카이빙 서비스**

<p>디어리의 프론트엔드 저장소입니다!</p>

![메인화면](./public/canvas.png)
<br /><br />


## 🤖 핵심 기능
###  📭 편지 작성 및 AI 분석
- 이미지, 텍스트 업로드 시 AI가 내용을 분석해 한 줄 요약과 감정 태그를 함께 생성하여 그 날의 감정을 다시 마주하고 정리할 수 있습니다.
- 완성된 편지 카드를 이미지로 저장하여 기록을 보관하거나 공유할 수 있습니다.

###  🫧 감정 아카이브 및 시각화
- 편지를 인물별, 감정별로 열람하고, 버블 차트로 감정 변화를 시각화합니다.

### ⏳ 편지 리마인드 및 답장
- 매일 자정, 과거 편지의 일부를 랜덤으로 띄워 다시 감정을 환기합니다.

### 🎨 개인화 및 사용자 경험 강화
- 배경 색상과 스티커를 활용해 자유롭게 홈 화면을 커스터마이징 할 수 있습니다.
- 폰트 테마를 선택하여 자신의 취향에 맞게 기록의 분위기를 바꿀 수 있습니다.
<br /><br />

## 🛠️ Tech Stack   
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5EBD7B?logo=zustand&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
<br /><br />


## 💖 FE Developer


<table>
<tr>
<td align="center" style="width: 200px; padding: 10px;">
<img src="https://github.com/summinn9.png" width="200"/><br/>
<b>장수민</b><br/>
<sub>회원가입, 온보딩, 인증, 마이페이지</sub>
</td>

<td align="center" style="width: 200px; padding: 10px;">
<img src="https://github.com/kxxnayun.png" width="200"/><br/>
<b>김나윤</b><br/>
<sub>홈, 편지함, 리포트, PWA 설정, 배포</sub>
</td>

<td align="center" style="width: 200px; padding: 10px;">
<img src="https://github.com/riveryunny.png" width="200"/><br/>
<b>이가윤</b><br/>
<sub>편지 추가, 편지 상세, 프롬 관리, 레이아웃, 인증 플로우</sub>
</td>
</tr>
</table>
<br />

## 🔗 Git Convention

### 📌 Git Flow
- 모든 개발은 `develop` 브랜치 기준
- `main` 브랜치는 **직접 작업** 금지
- 기능 개발은 `feature/*`
- 배포 준비는 `release/*`
- 운영 중 긴급 수정은 `hotfix/*`

### 📌 커밋 타입

| 라벨      | 용도     |
|-----------|----------|
| feat      | 기능 개발   |
| fix       | 버그 수정   |
| docs      | 문서       |
| refactor  | 리팩토링    |
| style     | UI 수정    |
| chore     | 설정 관련   |
