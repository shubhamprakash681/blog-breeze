import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import reduxStore from "./store/store.ts";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  AddPost,
  AllPosts,
  EditPost,
  ViewPost,
  Home,
  Login,
  SignUp,
  MyPosts,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { ProtectedAuthLayout } from "./components/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Routes>
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
              path="/password/forgot"
              element={
                <ProtectedAuthLayout authentication={false}>
                  <ForgotPassword />
                </ProtectedAuthLayout>
              }
            />
            <Route
              path="/password/reset"
              element={
                <ProtectedAuthLayout authentication={false}>
                  <ResetPassword />
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
              path="/my-posts"
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
        </Routes>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          position: "bottom-center",
        }}
      />
    </Provider>
  </StrictMode>
);
