export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
}

export async function getContributors(): Promise<Contributor[]> {
    try {
        const response = await fetch(
            "https://api.github.com/repos/jonothanhunt/creative-tech-stack/commits",
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

        const commits = await response.json();

        // Extract unique authors
        const contributorsMap = new Map<string, Contributor>();

        for (const commit of commits) {
            if (commit.author) {
                contributorsMap.set(commit.author.login, {
                    login: commit.author.login,
                    avatar_url: commit.author.avatar_url,
                    html_url: commit.author.html_url,
                });
            }
        }

        return Array.from(contributorsMap.values());
    } catch (error) {
        console.error("Error fetching contributors:", error);
        return [];
    }
}
