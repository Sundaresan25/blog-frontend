import "./App.css";
import { Toaster } from "react-hot-toast";

import { lazy } from "react";
import { Suspense } from "react";
import { Loader } from "./Components/Global/Loader";

// Lazy load the main index component
const LazyIndex = lazy(() => import("./Pages"));

function App() {
  return (
    <div className="App">
      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Suspense component for lazy loading */}
      <Suspense fallback={<Loader />}>
        {/* Lazy loaded index component */}
        <LazyIndex />
      </Suspense>
    </div>
  );
}

export default App;
