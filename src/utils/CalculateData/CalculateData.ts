import { countForm } from "../CountForm";

const calculateData = (
  commonData: any,
  data: any,
  personalizeData: any
): Object => {
  const age = calcAge(
    commonData.age.year,
    commonData.age.month,
    commonData.age.day
  );

  const ageForm = countForm(age, [
    data.personalPart.ageForm.t1,
    data.personalPart.ageForm.t2,
    data.personalPart.ageForm.t3,
  ]);

  const rebasePersonalizeData: any = {};
  personalizeData.forEach((v: any) => {
    rebasePersonalizeData[Object.keys(v)[0]] = Object.values(v)[0];
  });

  const telegramTitle: string = `@${
    rebasePersonalizeData.telegram.split("/").reverse()[0]
  }`;

  const linkedInTitle: string = rebasePersonalizeData.linkedIn
    .split("/")
    .reverse()
    .filter((v: string) => v)[0];

  const githubTitle: string = rebasePersonalizeData.authorGit
    .split("/")
    .reverse()[0];

  return {
    age: age,
    ageForm: ageForm,
    phone: rebasePersonalizeData.phone,
    email: rebasePersonalizeData.email,
    telegramLink: rebasePersonalizeData.telegram,
    telegramTitle: telegramTitle,
    linkedInLink: rebasePersonalizeData.linkedIn,
    linkedInTitle: linkedInTitle,
    githubLink: rebasePersonalizeData.authorGit,
    githubTitle: githubTitle,
    cvSiteLink: rebasePersonalizeData.cvCite,
  };
};

const calcAge = (year: number, month: number, date: number) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dob = new Date(year, month, date);
  const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  let age: number;
  age = today.getFullYear() - dob.getFullYear();
  if (today < dobnow) {
    age = age - 1;
  }
  return age;
};

export { calculateData };
