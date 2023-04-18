import { Request, Response } from "express";
import { getResumeDataService } from "../services";
import { LanguageEnum } from "../configurations";

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

  res.status(200).send({
    data: data,
    success: true,
  });
};

export { getResume };
