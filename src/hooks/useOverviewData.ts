import { useGetOverview } from "@/hooks/useOverview";
import { calculateStats } from "@/lib/statsCalculator";

export function useOverviewData(statKey: string) {
    const { data, isError, isPending, error } = useGetOverview();

    if (isPending) {
        return { isLoading: true };
    }

    if (isError) {
        return { error };
    }

    const { statValue, percentageChange } = calculateStats(
        data, statKey
    );

    return { statValue, percentageChange, isLoading: false, error: null };
}