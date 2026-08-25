// 에러 상태별 안내 문구

export type AppErrorType = 'notFound' | 'server' | 'maintenance' | 'network';

type ErrorContent = {
  title: string;
  /** 줄바꿈 위치가 디자인에 고정되어 있어 배열로 관리 */
  description: string[];
  /** 점검 시간처럼 본문보다 진하게 노출되는 보조 문구 */
  notice?: string;
};

export const ERROR_CONTENT: Record<AppErrorType, ErrorContent> = {
  notFound: {
    title: '존재하지 않는 페이지예요',
    description: ['찾으시는 페이지가 없어요.', '다시 한번 확인해 주세요'],
  },
  server: {
    title: '일시적인 오류가 발생했어요',
    description: ['서버 접속이 지연되고 있어요.', '잠시 후 다시 시도해 주세요.'],
  },
  maintenance: {
    title: '시스템 점검 중이에요',
    notice: '(10:00 ~ 18:00)',
    description: ['더 쾌적한 서비스를 위해', '서버를 점검하고 있어요.'],
  },
  network: {
    title: '인터넷 연결이 끊겼어요',
    description: ['와이파이나 데이터 연결 상태를', '확인한 후 다시 시도해 주세요.'],
  },
};
