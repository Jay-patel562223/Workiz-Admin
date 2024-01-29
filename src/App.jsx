import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import "bootstrap/scss/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/src/sweetalert2.scss";
import "./assets/scss/style.scss";
import List from "./pages/list/List";
// import Single from './pages/single/Single';
import New from "./pages/new/New";
import Login from "./pages/login/Login";
// import TC from './pages/tc/TC';

import Loader from "./components/Loader";
import NotFoundPage from "./components/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./util/ProtectedRoute";
import SingleUser from "./components/SingleUser";
import "./assets/scss/responsive.scss";
import ForgotPassword from "./ForgotPassword";
import VerifyOTP from "./ForgotPassword/VerifyOTP";
import ResetAdminPassword from "./ForgotPassword/ResetAdminPassword";
import ViewMoreRecentUser from "./components/table/ViewMoreRecentUser";
import ViewMoreActivity from "./components/ResentActivity/ViewMoreActivity";
import routes from "./helper/route";
import ViewAllDeletedData from "./pages/AllDeletedAccounts/ViewAllDeletedData";
import Reason from "./pages/Reason ";
import NewAccountRequest from "./pages/NewAccountRequest";

const Home = lazy(() => import("./pages/home/Home"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const Faq = lazy(() => import("./components/Faq"));
const Customer = lazy(() => import("./pages/Customer"));
const Vender = lazy(() => import("./pages/Vender"));
const CustomerVender = lazy(() => import("./pages/customerVender"));
const Customerpolicy = lazy(() =>
  import("./pages/PrivacyPolicy/Customerpolicy")
);
const Vendorpolicy = lazy(() => import("./pages/PrivacyPolicy/Vendorpolicy"));
const Unblock = lazy(() => import("./pages/Unblock"));
const Feedback = lazy(() => import("./components/Feedback"));
const RoleChange = lazy(() => import("./pages/RoleChange"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ViewNotification = lazy(() =>
  import("./components/Notification/ViewNotification")
);
const AppInfo = lazy(() => import("./pages/AppInfo"));
const VendorTC = lazy(() => import("./pages/tc/VendorTC"));
const CustomerTC = lazy(() => import("./pages/tc/CustomerTC"));
const Categories = lazy(() => import("./pages/categories/Categories"));
const Layout = lazy(() => import("./components/Layout"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            exact
            path={routes.home}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path={routes.customer}
            element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/:id"
            element={
              <ProtectedRoute>
                <SingleUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.vendor}
            element={
              <ProtectedRoute>
                <Vender />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/:id"
            element={
              <ProtectedRoute>
                <SingleUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.customervendor}
            element={
              <ProtectedRoute>
                <CustomerVender />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer&vendor/:id"
            element={
              <ProtectedRoute>
                <SingleUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.category}
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.notification}
            element={
              <ProtectedRoute>
                <ViewNotification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/block"
            element={
              <ProtectedRoute>
                <Unblock />
              </ProtectedRoute>
            }
          />
           <Route
            path="/reason"
            element={
              <ProtectedRoute>
                <Reason />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.profile}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venderTC"
            element={
              <ProtectedRoute>
                <VendorTC />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customerTC"
            element={
              <ProtectedRoute>
                <CustomerTC />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.Faqs}
            element={
              <ProtectedRoute>
                <Faq />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.contactus}
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customerPolicy"
            element={
              <ProtectedRoute>
                <Customerpolicy />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.vendorPolicy}
            element={
              <ProtectedRoute>
                <Vendorpolicy />
              </ProtectedRoute>
            }
          />

          <Route
            path={routes.feedback}
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />

          <Route
            path={routes.appinfo}
            element={
              <ProtectedRoute>
                <AppInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/role"
            element={
              <ProtectedRoute>
                <RoleChange />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resetPassword"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MoreRecentUser"
            element={
              <ProtectedRoute>
                <ViewMoreRecentUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MoreActivity"
            element={
              <ProtectedRoute>
                <ViewMoreActivity />
              </ProtectedRoute>
            }
          />
           <Route
            path="/AllDeletedUser"
            element={
              <ProtectedRoute>
                <ViewAllDeletedData />
              </ProtectedRoute>
            }
          />
           <Route
            path="/accountrequest"
            element={
              <ProtectedRoute>
                <NewAccountRequest />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route exact path={routes.login} element={<Login />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/verifyOPT" element={<VerifyOTP />} />
        <Route
          exact
          path="/resetAdminPassword"
          element={<ResetAdminPassword />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

export default App;
