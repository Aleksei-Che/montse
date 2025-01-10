import { useNavigate, useLocation } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        navigate(-1);
    };

    const goForward = (path: string) => {
        navigate(path);
    };

    const isFirstPage = location.pathname === "/";
    const isLastPage = location.pathname === "/home";

    return { goBack, goForward, isFirstPage, isLastPage };
};

export default useNavigation;