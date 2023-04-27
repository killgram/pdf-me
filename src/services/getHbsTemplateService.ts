import axios from "axios";
import { UrlConfiguration } from "../configurations";
import { genHbsUrlConfiguration } from "../utils";

const getHbsTemplateService = async (size: "small" | "full") => {
  const url: string = genHbsUrlConfiguration(size);
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

export { getHbsTemplateService };
