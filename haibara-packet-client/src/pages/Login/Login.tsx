import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ILoginForm } from '.';
import ThemeBase from '../../components/ThemeBase';
import useUserConfig from '../../customHooks/useUserConfig';
import LoginInput from './LoginInput';
const targetPath = '/dashboard';
const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = useForm<ILoginForm>();
  const { setLoginUserInfo, setLoginState } = useUserConfig();
  const handleLogin = async () => {
    const { emailAddress } = await form.validateFields();
    setLoginUserInfo({
      username: 'Gll Ly',
      emailAddress,
      userProfile: 'Default user',
    });
    setLoginState({
      token: 'df3fd3',
      isLogin: true,
    });
    navigate(targetPath);
  };
  return (
    <div className="flex min-h-screen w-screen min-w-full flex-col bg-gradient-to-r from-pink-300 via-purple-300 to-sky-500 dark:from-slate-900 dark:to-stone-900">
      <div className="ml-6 mt-6 flex items-center ">
        <img title="logo" src="/static/images/logo.svg" className="mr-3" />
        <span className="text-2xl text-white">
          {t('login.loginHeader.title')}
        </span>
      </div>
      <div className="mt-8 flex items-center justify-center ">
        <ThemeBase.Paper className="rounded-md p-6 sm:w-[280px] md:w-[300px] lg:w-[350px] ">
          <div className="my-8 text-center text-xl font-black">
            {t('login.loginTitle')}
          </div>
          <Form<ILoginForm> form={form} onFinish={handleLogin}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="emailAddress"
            >
              <LoginInput
                label={t('login.loginForm.usernameLabel')}
                placeholder={t('login.loginForm.usernamePlaceholder')}
                prefix={<UserOutlined />}
                name="emailAddress"
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="password"
              extra={
                <div className="mt-1 text-end">
                  <a className="text-xs text-black opacity-90 hover:!text-sky-500 dark:text-white">
                    {t('login.loginForm.forgotPassword')}
                  </a>
                </div>
              }
            >
              <LoginInput
                label={t('login.loginForm.passwordLabel')}
                placeholder={t('login.loginForm.passwordPlaceholder')}
                prefix={<LockOutlined />}
                type="password"
                name="password"
              />
            </Form.Item>

            <Form.Item>
              <div className="text-center">
                <button
                  type="submit"
                  className="after:water-wave-hide active:after:water-wave-show relative w-full rounded-xl bg-gradient-to-r from-pink-300 via-purple-300 to-sky-500 py-2 text-base text-white dark:from-slate-900 dark:to-stone-900"
                >
                  {t('login.loginForm.submitText')}
                </button>
              </div>
            </Form.Item>
          </Form>

          <div className="mt-10 text-center">
            <span className="text-xs text-black opacity-90 dark:text-white">
              {t('login.otherWayLogin')}
            </span>

            <div className="mb-20 mt-4 flex justify-center text-center">
              <a>
                <img title="qq" src="/static/images/qq.svg" className="mr-3" />
              </a>
              <a>
                <img
                  title="wechat"
                  src="/static/images/wechat.svg"
                  className="mr-3"
                />
              </a>
              <a>
                <img
                  title="weibo"
                  src="/static/images/weibo.svg"
                  className="mr-3"
                />
              </a>
            </div>

            <a className="cursor-pointer text-xs text-black opacity-90 hover:!text-sky-500 dark:text-white">
              {t('login.signUpTips')}
            </a>
          </div>
        </ThemeBase.Paper>
      </div>
    </div>
  );
};
export default Login;
