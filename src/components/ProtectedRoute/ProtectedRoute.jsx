import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
    // const isAdminRoute = window.location.pathname.startsWith('/admin');
    const isAdminRoute = true;
    // const user = useSelector(state => state.account.user);
    // const userRole = user.role;
    const userRole = 'ADMIN';

    if (isAdminRoute && userRole === 'ADMIN') {
        return (<>{props.children}</>);
    }
    // else {
    //     return (<NotPermitted />)
    // }
};

const ProtectedRoute = (props) => {
    // const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const isAuthenticated = true;
    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                :
                <Navigate to='/login' replace />
            }
        </>
    );
};

export default ProtectedRoute;

