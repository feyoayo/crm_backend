import { Router, Request, Response, NextFunction } from "express";

export interface IControllerPath {
  path: string;
  handler: (req: Request, res: Response, next?: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
}
