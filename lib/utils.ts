export function formatDate(dateString: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const postDate = new Date(dateString + "T00:00:00");
    const diffDays = Math.floor(
        (today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "TODAY";
    if (diffDays === 1) return "1 DAY AGO";
    if (diffDays <= 6) return `${diffDays} DAYS AGO`;
    if (diffDays <= 13) return "LAST WEEK";
    return dateString;
}
