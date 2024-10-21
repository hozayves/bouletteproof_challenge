export function formatStatValue(value: number, statKey: string): string {
    switch (statKey) {
        case "session_duration":
            return `${(value / 1000).toFixed(2)}s`;
        case "bounce_rate":
            return `${value.toFixed(2)}%`;
        default:
            return value.toString();
    }
}