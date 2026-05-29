import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GITHUB_USER = 'rajkrish0608';
const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`;

export interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  html_url: string;
  description: string;
}

export function useGitHubRepos() {
  const { data, error, isLoading } = useSWR<GitHubRepo[]>(REPOS_URL, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 3600000, // 1 hour cache
  });

  return {
    repos: data,
    isLoading,
    isError: error
  };
}
