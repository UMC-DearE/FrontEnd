import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout";
import { AppLayout } from "../layouts/AppLayout";

import HomePage from "../pages/HomePage";
import LetterPage from "../pages/LetterPage";
import ReportPage from "../pages/ReportPage";
import MyPage from "../pages/MyPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              { path: "/letter", element: <LetterPage /> },
              { path: "/report", element: <ReportPage /> },
              { path: "/my", element: <MyPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
