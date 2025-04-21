"use client";

import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const persistedStore = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={<Loading />} persistor={persistedStore}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
