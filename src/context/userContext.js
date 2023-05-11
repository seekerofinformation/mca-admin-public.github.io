import {createContext, useContext, useEffect, useState} from "react";
import UserService from "../services/userService";
import {useNavigate} from "react-router-dom";

export const UserContext = createContext(null)

const UserContextProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null);
    const [isAuth, setAuth] = useState(false);

    const handleLogin = async (data) => {
        try {
            const result = await UserService.login(data);

            if (!!result) {
                setAuth(true)
                localStorage.setItem("user", JSON.stringify(result))
                setUser(result)
            }

            return result
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogout = async () => {
        try {
            setAuth(false)

            await UserService.logout();
            localStorage.removeItem("user")
        } catch (e) {

        }
    }

    const handleUpdateUser = async () => {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    const getUserData = () => {
        const user = localStorage.getItem("user");

        setUser(!!user ? JSON.parse(user) : null)
        setAuth(!!user)
    };

    const updateUserData = async (id, data) => {
        try {
            const result = await UserService.update(id, data);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    const sendPasswordEmail = async (data) => {
        try {
            return await UserService.emailSend(data)
        } catch (e) {
            console.log(e)
        }
    }

    const changeUserPassword = async (data) => {
        try {
            return await UserService.passwordChange(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        if (!isAuth) {
            const user = localStorage.getItem("user");

            if (!user) {
                navigate("/")
            }
        }
    }, [isAuth])

    return (
        <UserContext.Provider
            value={{
                user,
                isAuth,
                handleLogin,
                handleLogout,
                updateUserData,
                sendPasswordEmail,
                changeUserPassword
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

function useUserContext() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error(
            'useCoursesContext must be user within an CoursesContext Provider',
        )
    }

    return context
}

export { UserContextProvider, useUserContext }
