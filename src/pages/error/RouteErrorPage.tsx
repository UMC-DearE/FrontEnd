// 라우터에서 잡힌 에러를 종류별로 안내

import { useRouteError } from 'react-router-dom';
import ErrorPage from '@/pages/error/ErrorPage';
import { resolveErrorType } from '@/utils/resolveErrorType';

export default function RouteErrorPage() {
  const error = useRouteError();

  if (import.meta.env.DEV) {
    console.error('route error', error);
  }

  return <ErrorPage type={resolveErrorType(error)} />;
}
