export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
}

interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
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

        const contributors = (await response.json()) as GitHubUser[];

        return contributors
            .filter((user) => user.type !== 'Bot' && !user.login.endsWith('[bot]'))
            .map((user) => ({
                login: user.login,
                avatar_url: user.avatar_url,
                html_url: user.html_url,
            }));
    } catch (error) {
        console.error("Error fetching contributors:", error);
        return [];
    }
}
