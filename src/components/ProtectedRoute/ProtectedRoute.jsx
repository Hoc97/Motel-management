import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/');
    const user = useSelector(state => state.account.user);
    const userRole = user.roles[0];

    if (isAdminRoute && userRole === 'ROLE_ADMIN') {
        return (<>{props.children}</>);
    }
    // else {
    //     return (<div>Không được phép truy cập</div>);
    // }
};

const ProtectedRoute = (props) => {
    let { username } = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            {username ?
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

