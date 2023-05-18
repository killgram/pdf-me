import { UrlConfiguration } from "../../configurations";
import { genSkills } from "../GenSkills";
import { calculateData } from "../CalculateData";
import { calcExperienceDuration } from "../CalcExperienceDuration";
import { calcTotalExp } from "../CalcTotalExp";
import { getHbsTemplateService } from "../../services";
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const pdfGenerator = async (
  data: any,
  commonData: any,
  personalizeData: any,
  size: "small" | "full"
): Promise<string> => {
  const templateHtml = await getHbsTemplateService(size);

  const skills: string[] = await genSkills();
  const calcData: Object = calculateData(commonData, data, personalizeData);
  const confirmDataSectionExperience = calcExperienceDuration(
    data.workItems,
    data.monthNames,
    data.workExperience.fromCurrentTime,
    data.workExperience.monthForm
  );
  const totalExp: string = calcTotalExp(
    confirmDataSectionExperience,
    data.personalPart.ageForm,
    data.workExperience.monthForm
  );
  const dataT = {
    ...data,
    image: UrlConfiguration.patientImage,
    skills: skills,
    commonData: commonData,
    calcData: calcData,
    experienceSection: confirmDataSectionExperience,
    totalExp: totalExp,
  };

  const template: any = handlebars.compile(templateHtml);
  const html = template(dataT);
  const pdfPath = path.join(
    process.cwd(),
    `src/pdf/${UrlConfiguration.patientName}-${data.lang}-${data.type}.pdf`
  );

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html);

    await page.pdf({
      path: pdfPath,
      displayHeaderFooter: false,
      headerTemplate: "",
      format: "A4",
      printBackground: true,
      margin: {
        bottom: 45,
        top: 45,
      },
    });
    await browser.close();
  } catch (e) {
    console.log(e);
  }

  return pdfPath;
};

export { pdfGenerator };
