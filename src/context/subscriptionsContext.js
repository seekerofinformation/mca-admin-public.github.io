import {createContext, useContext, useState} from "react";

import SubscriptionsService from "../services/subscriptionsService";

export const SubscriptionContext = createContext(null)

const SubscriptionContextProvider = ({ children }) => {
    const [subscription, setSubscription] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);

    const getSubscription = async (id) => {
        try {
            const result = await SubscriptionsService.getSubscription(id);

            setSubscription(result);
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const getSubscriptions = async () => {
     try {
         const result = await SubscriptionsService.getSubscriptions();

         setSubscriptions(result);
         return result
     } catch (e) {
         console.log(e)
     }
    }

    const addSubscription = async (data) => {
        try {
            const result = await SubscriptionsService.addSubscription(data);

            setSubscriptions(await getSubscriptions());
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const editSubscription = async (id, data) => {
        try {
            const result = await SubscriptionsService.editSubscription(id, data);

            setSubscriptions(await getSubscriptions());
            return result
        } catch (e) {
            console.log(e)
        }
    }

    const deleteSubscription = async (id) => {
        try {
            const result = await SubscriptionsService.deleteSubscription(id);

            setSubscriptions(await getSubscriptions());
            return result
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SubscriptionContext.Provider
            value={{
                subscription,
                subscriptions,
                getSubscription,
                getSubscriptions,
                addSubscription,
                editSubscription,
                deleteSubscription
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    )
}

function useSubscriptionContext() {
    const context = useContext(SubscriptionContext)
    if (context === undefined) {
        throw new Error(
            'useSubscriptionContext must be user within an SubscriptionContext Provider',
        )
    }

    return context
}

export { SubscriptionContextProvider, useSubscriptionContext }
