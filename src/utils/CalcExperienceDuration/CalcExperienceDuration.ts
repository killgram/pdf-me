import { countForm } from "../CountForm";

const calcExperienceDuration = (
  data: any,
  monthNames: any,
  untilNowMarker: string,
  monthForm: any
): Array<{}> => {
  const endData: Array<{}> = [];
  data.forEach((item: any) => {
    const monthFromTitle: string = `${monthNames[item.time.from.month]} ${
      item.time.from.year
    }`;
    let monthToTitle: string;
    if (item.time.to.month === null) {
      monthToTitle = untilNowMarker;
    } else {
      monthToTitle = `${monthNames[item.time.to.month]} ${item.time.to.year}`;
    }
    let totalMonth: string = "";
    let totalMonthNumber: number = 0;
    if (item.time.total === null) {
      const firstTime: Date = new Date();
      const secondTime: Date = new Date(
        item.time.from.year,
        item.time.from.month
      );
      totalMonthNumber = monthDiff(secondTime, firstTime);
    } else {
      totalMonthNumber = item.time.total;
    }
    totalMonth = `${totalMonthNumber} ${countForm(totalMonthNumber, [
      monthForm.t1,
      monthForm.t2,
      monthForm.t3,
    ])}`;

    endData.push({
      ...item,
      time: {
        from: monthFromTitle,
        to: monthToTitle,
        total: totalMonth,
      },
    });
  });

  return endData;
};

const monthDiff = (d1: Date, d2: Date): number => {
  let months: number = 1;
  months += (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export { calcExperienceDuration };
