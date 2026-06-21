import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import * as Zod from "zod";

export const validate =
  (schema: Zod.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors,
        });
      }
      next(error);
    }
  };
