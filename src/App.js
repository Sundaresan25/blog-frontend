import "./App.css";
import { Toaster } from "react-hot-toast";

import { lazy } from "react";
import { Suspense } from "react";
import { Loader } from "./Components/Global/Loader";

const LazyIndex = lazy(() => import("./Pages"));

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <LazyIndex />
      </Suspense>
    </div>
  );
}

export default App;
