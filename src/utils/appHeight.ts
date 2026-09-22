// iOS PWA에서 dvh가 갱신되지 않는 문제 대응용 실제 창 높이 동기화

export function initAppHeight() {
  const apply = () => {
    document.documentElement.style.setProperty('--app-vh', `${window.innerHeight}px`);
  };

  apply();

  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', apply);
  window.addEventListener('pageshow', apply);
  window.visualViewport?.addEventListener('resize', apply);
}
