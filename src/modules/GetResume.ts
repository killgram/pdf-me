import { Request, Response } from "express";
import { getResumeDataService } from "../services";
import { LanguageEnum } from "../configurations";
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
  const pdfPath = await pdfGenerator(data);

  const file = fs.createReadStream(pdfPath);
  const stat = fs.statSync(pdfPath);
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${data.lang}-${data.type}.pdf`
  );
  file.pipe(res);
};

export { getResume };
