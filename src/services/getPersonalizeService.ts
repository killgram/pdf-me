import axios from "axios";
import { UrlConfiguration } from "../configurations";

const getPersonalizeService = async () => {
  const url = `${UrlConfiguration.r3d3Domain}/personalize/getPersonalize`;
  const res = await axios.get(url);
  if (res.data) {
    return res.data?.list;
  } else {
    return null;
  }
};

export { getPersonalizeService };
