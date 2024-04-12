import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import QueryProvider from "./lib/tanstack-query/QueryProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ParallaxProvider } from "react-scroll-parallax";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <Provider store={store}>
        <ParallaxProvider>
          <App />
        </ParallaxProvider>
      </Provider>
    </QueryProvider>
  </BrowserRouter>
);
