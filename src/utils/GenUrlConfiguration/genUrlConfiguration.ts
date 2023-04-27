import { Keys, LanguageEnum, UrlConfiguration } from "../../configurations";

const genUrlConfiguration = (lang: LanguageEnum, size: "small" | "full") => {
  const localSize =
    size === "small"
      ? UrlConfiguration.githubSmall
      : UrlConfiguration.githubFull;

  return `${UrlConfiguration.githubUrl}/${lang}/${localSize}?ref=${UrlConfiguration.githubRef}&access_token=${Keys.githubAccessToken}`;
};

const genCommonResourcesUrlConfiguration = () => {
  return `${UrlConfiguration.githubUrl}/${UrlConfiguration.githubCommon}?ref=${UrlConfiguration.githubRef}&access_token=${Keys.githubAccessToken}`;
};

export { genUrlConfiguration, genCommonResourcesUrlConfiguration };
