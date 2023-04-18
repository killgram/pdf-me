import axios from "axios";
import { LanguageEnum, UrlConfiguration } from "../configurations";
import { genUrlConfiguration } from "../utils";

const getResumeDataService = async (
  lang: LanguageEnum,
  size: "small" | "full"
) => {
  const url = genUrlConfiguration(lang, size);
  const config = {
    headers: {
      Authorization: UrlConfiguration.githubAuthorization,
      Accept: UrlConfiguration.githubAccept,
    },
  };
  const res = await axios.get(url, config);
  if (res.data) {
    return res.data;
  } else {
    return null;
  }
};

export { getResumeDataService };
