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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/accountSlice/accountSlice';
import { useEffect, useLayoutEffect } from 'react';
import NotFound from './components/NotFound/NotFound';
import Loading from './components/Loading/Loading';

// const Layout = () => {
//   return (
//     <>
//       <Header />
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

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
    element:
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ,
    errorElement: <NotFound />,
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
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);
  const getAccount = async () => {
    // if (
    //   window.location.pathname === '/login'
    //   || window.location.pathname === '/register'
    // )
    //   return;
    let data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      dispatch(doGetAccountAction(data));
    }
  };

  useLayoutEffect(() => {
    getAccount();
  }, []);
  return (
    <>
      {/* {
        isLoading === true
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          ? */}
      <RouterProvider router={router} />
      {/* :
          <Loading />
      } */}
    </>
  );
};

export default App;