declare interface GithubContributor {
    avatar_url?: string;
    contributions?: number;
    events_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    gravatar_id?: string;
    html_url?: string;
    id?: number;
    login?: string;
    node_id?: string;
    organizations_url?: string;
    received_events_url?: string;
    repos_url?: string;
    site_admin?: false;
    starred_url?: string;
    subscriptions_url?: string;
    type?: "User" | "Bot";
    url?: string;
}
