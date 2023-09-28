import { useState, useEffect } from 'react';
import config from '../config';

const useFetch = () => {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(config.BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                setReminders(data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [refresh]);

    return { isLoading, reminders, setRefresh, refresh };
};

export default useFetch