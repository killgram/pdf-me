import { Request, Response } from "express";
import {
  getCommonResourcesService,
  getPersonalizeService,
  getResumeDataService,
} from "../services";
import { LanguageEnum, UrlConfiguration } from "../configurations";
import { pdfGenerator } from "../utils";
const fs = require("fs");

interface RequestQuery {
  lang: LanguageEnum;
  size: "small" | "full";
}

/**
 * @description get pdf resume file
 * @param {Request} req
 * @param {Response} res
 */
const getResume = async (
  req: Request<{}, {}, {}, RequestQuery>,
  res: Response
) => {
  const { lang, size } = req.query;
  const data = await getResumeDataService(lang, size);
  const commonData = await getCommonResourcesService();
  const personalizeData = await getPersonalizeService();
  const pdfPath = await pdfGenerator(data, commonData, personalizeData, size);

  const file = fs.createReadStream(pdfPath);
  const stat = fs.statSync(pdfPath);
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${UrlConfiguration.patientName}-${data.lang}-${data.type}.pdf`
  );
  file.pipe(res);
};

export { getResume };
