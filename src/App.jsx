import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import DashBoard from './pages/Dashboard/Dashboard';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import Rooms from './pages/Rooms/Rooms';
import ElectricalWater from './pages/Electrical-water/Electrical-water';
import Contract from './pages/Contract/Contract';
import Authorization from './pages/Authorization/Authorization';
import Setting from './pages/Setting/Setting';
import Support from './pages/Support/Support';
import DetailRoom from './pages/Rooms/components/DetailRoom';
import ListRoom from './pages/Rooms/components/ListRoom';

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
        element: <Rooms />,
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