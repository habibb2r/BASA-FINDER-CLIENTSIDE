

import { Suspense } from "react";


const LoginPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-cyan-200 h-screen w-screen flex justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
