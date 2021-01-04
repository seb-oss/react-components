import { metaConfigs } from "@configs";

export function initMetaConfiguration(): void {
    setCanonicalURL();
    setJsonLD();
}

export function getCommonMetaTag(): Array<MetaTag> {
    return [
        { name: "keywords", content: metaConfigs.keywords },
        { name: "description", content: metaConfigs.description },
        { name: "robots", content: "index, follow" },
        // Facebook open graph
        { property: "og:url", content: metaConfigs.siteUrl },
        { property: "og:type", content: "website" },
        { property: "og:title", content: metaConfigs.title },
        { property: "og:site_name", content: metaConfigs.title },
        { property: "og:locale", content: "en_US" },
        { property: "og:description", content: metaConfigs.description },
        { property: "og:image", content: metaConfigs.sitePreviewImageUrl },
        { property: "og:image:secure_url", content: metaConfigs.sitePreviewImageUrl },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1339" },
        { property: "og:image:height", content: "943" },
        // Twitter card
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: metaConfigs.title },
        { name: "twitter:description", content: metaConfigs.description },
        { name: "twitter:image", content: metaConfigs.sitePreviewImageUrl },
    ];
}

function setCanonicalURL(url?: string): void {
    const canonicalUrl: string = url === undefined ? document.URL : url;
    const link: HTMLLinkElement = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
    link.setAttribute("href", canonicalUrl);
}

function setJsonLD(): void {
    const script: HTMLScriptElement = document.createElement("script");
    script.type = "application/json+ld";
    script.text = JSON.stringify(metaConfigs.jsonLD);
    document.head.appendChild(script);
}
