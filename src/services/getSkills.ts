import axios from "axios";
import { UrlConfiguration } from "../configurations";

const getSkills = async () => {
  const url = `${UrlConfiguration.r3d3Domain}/personalize/getSkills`;
  const res = await axios.get(url);
  if (res.data) {
    return res.data?.list;
  } else {
    return null;
  }
};

export { getSkills };
