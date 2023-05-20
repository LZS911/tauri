import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { registerRouter } from '.';
import HeaderProgress from '../components/HeaderProgress';
import useUserConfig from '../customHooks/useUserConfig';
import Layout from '../pages/Layout';
import { unAuthRouter, routerConfig } from './router.config';

const RouterComponent: React.FC = () => {
  const { isLogin, token, getUserConfig, getUserInfoLoading } = useUserConfig();
  useEffect(() => {
    getUserConfig();
  }, [getUserConfig]);

  const renderDocument = () => {
    const validLoginStatus = isLogin || token;
    if (getUserInfoLoading) {
      return <HeaderProgress />;
    }

    if (!validLoginStatus) {
      return (
        <Suspense fallback={<HeaderProgress />}>
          <Routes>
            {registerRouter(unAuthRouter)}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      );
    }

    return (
      <Suspense fallback={<HeaderProgress />}>
        <Layout>
          <Routes>
            {registerRouter(routerConfig)}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Layout>
      </Suspense>
    );
  };

  return <BrowserRouter>{renderDocument()}</BrowserRouter>;
};

export default RouterComponent;
