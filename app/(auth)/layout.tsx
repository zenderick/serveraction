interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="min-h-screen grid place-items-center">{children}</div>;
};
export default AuthLayout;
