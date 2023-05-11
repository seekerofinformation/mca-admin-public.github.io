import {createContext, useContext, useState} from "react";

import {students as studentsData } from "../api/mock/students";

import StudentsService from "../services/studentsService";

export const StudentsContext = createContext(null)

const StudentsContextProvider = ({ children }) => {
    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        try {
            const result = await StudentsService.getStudents();

            setStudents(result);
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const getStudent = async (id) => {
        try {
            const result = await StudentsService.getStudent(id);

            setStudents(await getStudents());
            return result
        } catch (e) {
            console.log(e)
        }
    }
    //
    // const addSubscriptions = async (data) => {
    //     try {
    //         const result = await SubscriptionsService.addSubscription(data);
    //
    //         setSubscriptions(await getSubscriptions());
    //         return result
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // const editSubscriptions = async (id, data) => {
    //     try {
    //         const result = await SubscriptionsService.editSubscription(id, data);
    //
    //         setSubscriptions(await getSubscriptions());
    //         return result
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // const deleteSubscriptions = async (id) => {
    //     try {
    //         const result = await SubscriptionsService.deleteSubscription(id);
    //
    //         setSubscriptions(await getSubscriptions());
    //         return result
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <StudentsContext.Provider
            value={{
                students,
                getStudent,
                getStudents,
            }}
        >
            {children}
        </StudentsContext.Provider>
    )
}

function useStudentsContext() {
    const context = useContext(StudentsContext)
    if (context === undefined) {
        throw new Error(
            'useStudentsContext must be user within an StudentsContext Provider',
        )
    }

    return context
}

export { StudentsContextProvider, useStudentsContext }
