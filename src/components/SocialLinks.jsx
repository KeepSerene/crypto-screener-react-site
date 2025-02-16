import { safeGet } from "../utils/helpers";

function SocialLinks({ coinData }) {
  const socialLinks = [
    {
      type: "github",
      url: safeGet(coinData, "links.repos_url.github[0]"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="size-6"
        >
          <path
            fill="currentColor"
            d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91c.575.101.79-.244.79-.546c0-.273-.014-1.178-.014-2.142c-2.889.532-3.636-.704-3.866-1.35c-.13-.331-.69-1.352-1.18-1.625c-.402-.216-.977-.748-.014-.762c.906-.014 1.553.834 1.769 1.179c1.035 1.74 2.688 1.25 3.349.948c.1-.747.402-1.25.733-1.538c-2.559-.287-5.232-1.279-5.232-5.678c0-1.25.445-2.285 1.178-3.09c-.115-.288-.517-1.467.115-3.048c0 0 .963-.302 3.163 1.179c.92-.259 1.897-.388 2.875-.388c.977 0 1.955.13 2.875.388c2.2-1.495 3.162-1.179 3.162-1.179c.633 1.581.23 2.76.115 3.048c.733.805 1.179 1.825 1.179 3.09c0 4.413-2.688 5.39-5.247 5.678c.417.36.776 1.05.776 2.128c0 1.538-.014 2.774-.014 3.162c0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25C24 5.896 18.854.75 12.5.75"
          ></path>
        </svg>
      ),
    },

    {
      type: "twitter",
      url:
        safeGet(coinData, "links.twitter_screen_name") !== "N/A"
          ? `https://x.com/${safeGet(coinData, "links.twitter_screen_name")}`
          : null,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          style={{
            transform: "rotate(360deg)",
          }}
          transform="rotate(360)"
          viewBox="0 0 1024 1024"
          className="size-6"
        >
          <path
            fill="currentColor"
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64m215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6"
          ></path>
          <path fill="rgba(0, 0, 0, 0)" d="M0 0h1024v1024H0z"></path>
        </svg>
      ),
    },

    {
      type: "reddit",
      url: safeGet(coinData, "links.subreddit_url"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          style={{
            transform: "rotate(360deg)",
          }}
          transform="rotate(360)"
          viewBox="0 0 24 24"
          className="size-6"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12m-4.312-.942c.194.277.304.604.316.942a1.75 1.75 0 0 1-.972 1.596q.021.264 0 .528c0 2.688-3.132 4.872-6.996 4.872S5.04 16.812 5.04 14.124a3.4 3.4 0 0 1 0-.528 1.75 1.75 0 1 1 1.932-2.868 8.57 8.57 0 0 1 4.68-1.476l.888-4.164a.37.37 0 0 1 .444-.288l2.94.588a1.2 1.2 0 1 1-.156.732L13.2 5.58l-.78 3.744a8.54 8.54 0 0 1 4.62 1.476 1.75 1.75 0 0 1 2.648.258M8.206 12.533a1.2 1.2 0 1 0 1.996 1.334 1.2 1.2 0 0 0-1.996-1.334m3.806 4.891c1.065.044 2.113-.234 2.964-.876a.335.335 0 1 0-.468-.48A3.94 3.94 0 0 1 12 16.8a3.92 3.92 0 0 1-2.496-.756.324.324 0 0 0-.456.456 4.6 4.6 0 0 0 2.964.924m2.081-3.178c.198.132.418.25.655.25a1.2 1.2 0 0 0 1.212-1.248 1.2 1.2 0 1 0-1.867.998"
            clipRule="evenodd"
          ></path>
          <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z"></path>
        </svg>
      ),
    },

    {
      type: "facebook",
      url:
        safeGet(coinData, "links.facebook_username") !== "N/A"
          ? `https://facebook.com/${safeGet(
              coinData,
              "links.facebook_username"
            )}`
          : null,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          style={{
            transform: "rotate(360deg)",
          }}
          transform="rotate(360)"
          viewBox="0 0 24 24"
          className="size-6"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067"
            clipRule="evenodd"
          ></path>
          <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z"></path>
        </svg>
      ),
    },
  ];

  return (
    <nav className="text-customGray-100 flex max-md:justify-end items-center gap-4 md:absolute md:right-4 md:bottom-4">
      {socialLinks.map(({ type, url, icon }) => {
        if (!url || url === "N/A") return null;

        return (
          <a
            key={type}
            href={url}
            target="_blank"
            aria-label={`Visit ${safeGet(coinData, "name")}'s ${type} page`}
            title={type[0].toUpperCase() + type.slice(1)}
            className="transition-colors hover:text-primary focus-visible:text-primary"
          >
            {icon}
          </a>
        );
      })}
    </nav>
  );
}

export default SocialLinks;
