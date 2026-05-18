import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import PublicLayout from '@components/layout/PublicLayout';
import ProLayout from '@components/layout/ProLayout';

const HomePage = lazy(() => import('@pages/public/HomePage'));
const AboutPage = lazy(() => import('@pages/public/AboutPage'));
const ServicesPage = lazy(() => import('@pages/public/ServicesPage'));
const CaseStudiesPage = lazy(() => import('@pages/public/CaseStudiesPage'));
const ContactPage = lazy(() => import('@pages/public/ContactPage'));
const TermsOfServicePage = lazy(() => import('@pages/public/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('@pages/public/PrivacyPolicyPage'));

const LoginPage = lazy(() => import('@pages/pro/LoginPage'));
const SignUpPage = lazy(() => import('@pages/pro/SignUpPage'));
const TikTokOAuthCallbackPage = lazy(() => import('@pages/pro/TikTokOAuthCallbackPage'));
const DashboardPage = lazy(() => import('@pages/pro/DashboardPage'));
const MediaLibraryPage = lazy(() => import('@pages/pro/MediaLibraryPage'));
const PostEditorPage = lazy(() => import('@pages/pro/PostEditorPage'));
const CreatePostPage = lazy(() => import('@pages/pro/CreatePostPage'));
const PlannerPage = lazy(() => import('@pages/pro/PlannerPage'));

function Loading(): React.JSX.Element {
  return (
    <div className="bg-bg-primary flex min-h-screen items-center justify-center">
      <div className="text-accent-lime text-lg font-medium">Loading…</div>
    </div>
  );
}

function App(): React.JSX.Element {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Route>

            {/* PRO Auth */}
            <Route path="/pro/login" element={<LoginPage />} />
            <Route path="/pro/signup" element={<SignUpPage />} />
            <Route path="/tiktok/oauth/callback" element={<TikTokOAuthCallbackPage />} />

            {/* PRO App */}
            <Route path="/pro" element={<ProLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="media" element={<MediaLibraryPage />} />
              <Route path="create" element={<CreatePostPage />} />
              <Route path="editor" element={<PostEditorPage />} />
              <Route path="planner" element={<PlannerPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
