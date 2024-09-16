import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import reduxStore from "./store/store.ts";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AddPost, AllPosts, EditPost, Home, Login, SignUp } from "./pages";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/posts" element={<AllPosts />} />
      <Route path="/post/new" element={<AddPost />} />
      <Route path="/post/edit/:id" element={<EditPost />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          position: "bottom-center",
        }}
      />
    </Provider>
  </StrictMode>
);
