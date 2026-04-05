import { createBrowserRouter } from "react-router-dom";

import { BaseLayout } from "@/layouts/BaseLayout";
import { AppLayout } from "@/layouts/AppLayout";
import NotFoundPage from "@/pages/NotFoundPage";

import LoginPage from "@/pages/onboarding/LoginPage";
import OAuthCallbackPage from "@/pages/onboarding/OAuthCallbackPage";

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
import FromCreatePage from "@/pages/my/FromCreatePage";
import StylePage from "@/pages/my/StylePage";
import ThemePage from "@/pages/my/ThemePage";
import MyTermsPage from "@/pages/my/TermsPage";
import PrivacyPage from "@/pages/my/PrivacyPage";
import EditLetterPage from "@/pages/letter/EditLetterPage";
import AuthGuard from "@/routes/AuthGuard";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <NotFoundPage />,
    children: [ /* 헤더 따로 */
      {
        element: <AppLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "auth/oauth2/:provider/callback", element: <OAuthCallbackPage /> },

          // 인증 없이 접근 가능한 페이지 추가
          { path: "create", element: <LetterCreatePage /> },
          { path: "letter", element: <LetterBoxPage /> },
                        { path: "report", element: <ReportPage /> },
                        { path: "my", element: <MyHomePage /> },
                        

          {
            path: "auth",
            children: [
              { path: "terms", element: <TermsPage /> },
              { path: "signup", element: <SetNickamePage /> },
            ],
          },
        ],
      },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <HomePage /> },

              {
                path: "create",
                children: [

                  { path: "detail", element: <CreateDetailPage /> },
                  { path: "from", element: <SetFromPage /> },
                ],
              },

              {
                path: "letter",
                children: [
                  { path: ":id", element: <LetterDetailPage /> },
                  { path: ":id/edit", element: <EditLetterPage /> },
                ],
              },


              {
                path: "my",
                children: [
                  { path: "profile", element: <ProfilePage /> },
                  { path: "account", element: <AccountPage /> },
                  {
                    path: "from",
                    children: [
                      { index: true, element: <FromPage /> },
                      { path: "create", element: <FromCreatePage /> },
                    ],
                  },
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

