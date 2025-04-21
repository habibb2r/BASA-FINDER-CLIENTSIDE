
// import VerifyPayment from "@/components/VerifyPayment/VerifyPayment";

// export default function VerifyPaymentPage() {
//   return <VerifyPayment />;
// }

import { Suspense } from "react";
import VerifyPayment from "@/components/VerifyPayment/VerifyPayment";

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyPayment />
    </Suspense>
  );
}
