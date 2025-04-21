// import LoginForm from "@/components/modules/auth/login/LoginForm";

// const LoginPage = () => {
//   return (
//     <div className="bg-gradient-to-r from-blue-400 to-cyan-200 h-screen w-screen flex justify-center items-center">
//       <LoginForm />
//     </div>
//   );
// };

// export default LoginPage;


import LoginForm from "@/components/modules/auth/login/LoginForm";
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
