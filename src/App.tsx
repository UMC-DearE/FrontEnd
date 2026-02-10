import router from "@/routes/router";
import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/common/ToastProvider";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    // 앱이 처음 렌더될 때 로그인 상태 확인
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

