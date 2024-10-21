import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useOverview = (query) => {
    const fetchTotalView = () => {
        axios.get(process.env.Url, {
            headers: {
                'X-API-Key': process.env.XApiKey
            }
        }).then(res => res.data)
    }

    return useQuery({
        queryKey: ["views", query],
        queryFn: fetchTotalView,
        staleTime: 10 * 1000,
        placeholderData: keepPreviousData
    })
}