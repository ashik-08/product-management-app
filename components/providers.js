"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../lib/store";
import { LoadingSpinner } from "./ui/loading";

function PersistGateLoading() {
  return (
    <div className="min-h-screen bg-primary-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Loading application...</p>
      </div>
    </div>
  );
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistGateLoading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
