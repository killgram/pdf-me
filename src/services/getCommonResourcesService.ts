import axios from "axios";
import { UrlConfiguration } from "../configurations";
import { genCommonResourcesUrlConfiguration } from "../utils";

const getCommonResourcesService = async () => {
  const url = genCommonResourcesUrlConfiguration();
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

export { getCommonResourcesService };
