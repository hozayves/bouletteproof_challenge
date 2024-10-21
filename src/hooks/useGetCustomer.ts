import { keepPreviousData, useQuery, UseQueryResult } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

// Define the structure of the API response
interface CustomerData {
    id: number,
    first_name: string,
    last_name: string,
    customer_email: string,
    signup_date: string,
    last_activity: string
}

export const useGetCustomer = (): UseQueryResult<CustomerData[], AxiosError> => {
    return useQuery<CustomerData[], AxiosError>({
        queryKey: ["customer"],
        queryFn: async () => {
            const { data } = await axios.get<CustomerData[]>(
                process.env.NEXT_PUBLIC_CUSTOMER_ENDPOINT!,
                { headers: { 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY! } }
            )
            return data
        },
        staleTime: 30 * 1000,
        placeholderData: keepPreviousData,
    })
}
