// GA4 연동

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isEnabled = () => !!MEASUREMENT_ID && typeof window !== 'undefined';

export function initGA() {
  if (!isEnabled() || document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (!isEnabled()) return;

  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_title: document.title,
  });
}

export type SignUpMethod = 'invite' | 'organic';

export function trackSignUp(method: SignUpMethod) {
  if (!isEnabled()) return;

  window.gtag?.('event', 'sign_up', { method });
}
