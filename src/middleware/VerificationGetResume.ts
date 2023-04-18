import { Request, Response, NextFunction } from "express";
import { LanguageEnum } from "../configurations";

interface RequestQuery {
  lang: LanguageEnum;
  size: "small" | "full";
}

const verificationGetResume = (
  req: Request<{}, {}, {}, RequestQuery>,
  res: Response,
  next: NextFunction
) => {
  const { lang, size } = req.query;
  if (!lang || !size) {
    return res.status(200).send({
      title: "query param is missing",
      success: false,
    });
  }
  if (!(lang in LanguageEnum)) {
    return res.status(200).send({
      title: `param ${lang} is incorrect`,
      success: false,
    });
  }
  if (!(size === "small" || size === "full")) {
    return res.status(200).send({
      title: `param ${size} is incorrect`,
      success: false,
    });
  }
  next();
};

export { verificationGetResume };
