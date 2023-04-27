import { getSkills } from "../../services";

const genSkills = async () => {
  const skillsList = await getSkills();
  let skills: Array<string> = [];
  skillsList.forEach((item: any) => {
    if (item?.importance === 1 || item?.importance === 4) {
      skills.push(item?.name);
    }
  });

  return skills;
};

export { genSkills };
