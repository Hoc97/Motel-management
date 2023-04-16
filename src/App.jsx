import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashBoard from './pages/dashboard';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import Room from './pages/Room';
import ElectricalWater from './pages/Electrical-water';
import Contract from './pages/Contract';
import Authorization from './pages/Authorization';
import Setting from './pages/Setting';
import Support from './pages/Support';
import DetailRoom from './pages/Room/components/DetailRoom';
import ListRoom from './pages/Room/components/ListRoom';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Layout />,
  //   errorElement: <div>404 NOT FOUND</div>,
  //   children: [
  //     {
  //       index: true, element: <Home />
  //     },
  //     {
  //       path: "contact",
  //       element: <Contact />,
  //     },
  //     {
  //       path: "book",
  //       element: <Bookpage />,
  //     },
  //   ],
  // },
  {
    path: "/",
    element: <LayoutAdmin />,
    errorElement: <div>404 NOT FOUND</div>,
    children: [
      {
        index: true, element: <DashBoard />
      },
      {
        path: "rooms",
        element: <Room />,
        children: [
          {
            index: true, element: <ListRoom />
          },
          {
            path: ":id",
            element: <DetailRoom />,
          },
        ]
      },
      {
        path: "electrical",
        element: <ElectricalWater />,
      },
      {
        path: "contract",
        element: <Contract />,
      },
      {
        path: "authorization",
        element: <Authorization />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "support",
        element: <Support />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <RegisterPage />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;