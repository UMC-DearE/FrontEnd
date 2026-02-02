import router from "@/routes/router";
import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/common/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;

