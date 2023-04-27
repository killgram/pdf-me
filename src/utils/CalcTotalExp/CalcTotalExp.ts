import { countForm } from "../CountForm";

const calcTotalExp = (data: any, ageForm: any, monthForm: any): string => {
  const totalMonth: number =
    data.reduce(
      (acc: any, current: any) =>
        acc + Number(current.time.total.split(" ")[0]),
      0
    ) -
    data.length +
    1;
  const tYear: number = Math.trunc(totalMonth / 12);
  const tMonth: number = totalMonth - tYear * 12;

  return `${tYear} ${countForm(tYear, [
    ageForm.t1,
    ageForm.t2,
    ageForm.t3,
  ])} ${tMonth} ${countForm(tMonth, [
    monthForm.t1,
    monthForm.t2,
    monthForm.t3,
  ])}`;
};

export { calcTotalExp };
