import { createBrowserRouter } from "react-router-dom";

import { BaseLayout } from "@/layouts/BaseLayout";
import { AppLayout } from "@/layouts/AppLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "@/pages/onboarding/LoginPage";
import SplashPage from "@/pages/onboarding/SplashPage";

import TermsPage from "@/pages/setup/TermsPage";
import SetNickamePage from "@/pages/setup/SetNicknamePage";

import HomePage from "@/pages/HomePage";

import LetterCreatePage from "@/pages/create/LetterCreatePage";
import CreateDetailPage from "@/pages/create/CreateDetailPage";
import SetFromPage from "@/pages/create/SetFromPage";

import LetterBoxPage from "@/pages/letter/LetterBoxPage";
import LetterDetailPage from "@/pages/letter/LetterDetailPage";

import ReportPage from "@/pages/report/ReportPage";

import MyHomePage from "@/pages/my/MyhomePage";
import ProfilePage from "@/pages/my/ProfilePage";
import AccountPage from "@/pages/my/AccountPage";
import FromPage from "@/pages/my/FromPage";
import StylePage from "@/pages/my/StylePage";
import ThemePage from "@/pages/my/ThemePage";
import MyTermsPage from "@/pages/my/TermsPage";
import PrivacyPage from "@/pages/my/PrivacyPage";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <NotFoundPage />,
    children: [ /* 헤더 따로 */
      { path: "login", element: <LoginPage /> },
      { path: "splash", element: <SplashPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: "setup",
                children: [
                  { path: "terms", element: <TermsPage /> },
                  { path: "setnickname", element: <SetNickamePage /> },
                ],
              },

              { index: true, element: <HomePage /> },

              {
                path: "create",
                children: [
                  { index: true, element: <LetterCreatePage /> },
                  { path: "detail", element: <CreateDetailPage /> },
                  { path: "from", element: <SetFromPage /> },
                ],
              },

              {
                path: "letter",
                children: [
                  { index: true, element: <LetterBoxPage /> },
                  { path: ":id", element: <LetterDetailPage /> },
                ],
              },

              { path: "report", element: <ReportPage /> },

              {
                path: "my",
                children: [
                  { index: true, element: <MyHomePage /> },
                  { path: "profile", element: <ProfilePage /> },
                  { path: "account", element: <AccountPage /> },
                  { path: "from", element: <FromPage /> },
                  { path: "style", element: <StylePage /> },
                  { path: "theme", element: <ThemePage /> },
                  { path: "terms", element: <MyTermsPage /> },
                  { path: "privacy", element: <PrivacyPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

