import { Response } from "express";

export function handleError(res: Response, error: unknown, msg: string) {
  if (error instanceof Error) {
    console.error(`${msg}. ${error.message}`);
    return res.status(400).json({ error: error.message });
  } else {
    console.error(`Unexpected error: ${error}`);
    return res.status(500).json({ error: "Internal server error." });
  }
}