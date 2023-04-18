import { Request, Response } from "express";

/**
 * @description check work status api
 * @param {Request} req
 * @param {Response} res
 */
const getWorkStatus = (req: Request, res: Response) => {
  res.status(200).send({
    title: "pdf-me is working correctly",
    success: true,
  });
};

export { getWorkStatus };
