export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
}

export async function getContributors(): Promise<Contributor[]> {
    try {
        const response = await fetch(
            "https://api.github.com/repos/jonothanhunt/creative-tech-stack/contributors?per_page=100",
            {
                next: { revalidate: 3600 },
                headers: {
                    "User-Agent": "CreativeTechStack",
                },
            }
        );

        if (!response.ok) {
            console.error("Failed to fetch contributors", response.statusText);
            return [];
        }

        const contributors = await response.json();

        return contributors.map((user: any) => ({
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
        }));
    } catch (error) {
        console.error("Error fetching contributors:", error);
        return [];
    }
}
