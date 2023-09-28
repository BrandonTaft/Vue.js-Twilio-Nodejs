import { useState, useEffect } from 'react';
import config from '../config';

export default function useFetch() {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [serverError, setServerError] = useState(false);

    // useEffect(() => {
    //     setIsLoading(true);
    //     const fetchReminders = async () => {
    //         try {
    //             const response = await fetch(config.BASE_URL);
    //             const data = await response.json();
    //             return data;
    //         } catch (error) {
    //             setServerError(error);
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchReminders().then(data => {
    //         setReminders(data)
    //         setIsLoading(false);
    //       });
    // }, [refresh]);
    useEffect(() => {
    setIsLoading(true);
    fetch(config.BASE_URL)
      .then((res) => {console.log(res), res.json()})
      .then((data) => {
        console.log(data)
        setReminders(data)
      })
      .catch((err) => {
        setServerError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refresh]);

    return { reminders, isLoading, refresh, setRefresh, serverError }
};