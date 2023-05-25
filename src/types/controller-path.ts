import { NextFunction, Request, Response, Router } from "express";

export interface IControllerPath {
  path: string;
  handler: (req: Request<any>, res: Response, next?: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
  middlewares?: Array<any>;
}
