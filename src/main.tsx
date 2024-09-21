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
import {
  AddPost,
  AllPosts,
  EditPost,
  ViewPost,
  Home,
  Login,
  SignUp,
  MyPosts,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { ProtectedAuthLayout } from "./components/index.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/"
        element={
          <ProtectedAuthLayout authentication={false}>
            <Home />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedAuthLayout authentication={false}>
            <Login />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedAuthLayout authentication={false}>
            <SignUp />
          </ProtectedAuthLayout>
        }
      />

      <Route
        path="/posts"
        element={
          <ProtectedAuthLayout authentication>
            <AllPosts />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/posts/my-posts"
        element={
          <ProtectedAuthLayout authentication>
            <MyPosts />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/post/new"
        element={
          <ProtectedAuthLayout authentication>
            <AddPost />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/post/edit/:id"
        element={
          <ProtectedAuthLayout authentication>
            <EditPost />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/post/:id"
        element={
          <ProtectedAuthLayout authentication>
            <ViewPost />
          </ProtectedAuthLayout>
        }
      />
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
