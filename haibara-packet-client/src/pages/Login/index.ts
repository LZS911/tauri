import { HTMLInputTypeAttribute, ReactNode } from 'react';
import Login from './Login';
export interface ILoginForm {
  emailAddress: string;
  password: string;
}
export interface LoginInputProps {
  placeholder: string;
  prefix: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (val?: string) => void;
  label: string;
  type?: HTMLInputTypeAttribute;
  name: string;
}
export default Login;
