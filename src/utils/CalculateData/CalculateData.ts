import { countForm } from "../CountForm";

const calculateData = (commonData: any, data: any): Object => {
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

  return {
    age: age,
    ageForm: ageForm,
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
