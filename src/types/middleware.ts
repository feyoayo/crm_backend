import { Response, Request, NextFunction } from "express";
export interface MiddlewareInterface {
  run(req: Request, res: Response, next: NextFunction): void;
}
