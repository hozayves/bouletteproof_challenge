import { keepPreviousData, useQuery, UseQueryResult } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

// Define the structure of the API response
interface OverviewData {
    visit_id: number;
    customer_id: string;
    visit_timestamp: string;
    visit_source: string;
    device_type: string;
    browser_type: string;
    session_duration: number;
    actions_taken: string;
    geo_location: string;
}

export const useGetOverview = (): UseQueryResult<OverviewData[], AxiosError> => {
    return useQuery<OverviewData[], AxiosError>({
        queryKey: ["website_view"],
        queryFn: async () => {
            const { data } = await axios.get<OverviewData[]>(
                process.env.NEXT_PUBLIC_ENDPOINT!,
                { headers: { 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY! } }
            )
            return data
        },
        staleTime: 30 * 1000,
        placeholderData: keepPreviousData,
    })
}
