// iOS PWA에서 레이아웃 뷰포트와 실제 창 높이가 어긋나는 문제 대응

export function initAppHeight() {
  const apply = () => {
    const layoutHeight = document.documentElement.clientHeight;
    const gap = Math.max(0, window.innerHeight - layoutHeight);

    document.documentElement.style.setProperty('--app-vh', `${layoutHeight}px`);
    document.documentElement.style.setProperty('--vp-gap', `${gap}px`);
  };

  apply();

  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', apply);
  window.addEventListener('pageshow', apply);
  window.visualViewport?.addEventListener('resize', apply);
}
