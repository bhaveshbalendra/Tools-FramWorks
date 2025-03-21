import { Request, Response } from "express";

const handleRegisterUser = async (
  response: Response,
  request: Request
): Promise<any> => {
  try {
    const body = request.body;

    if (!body || Object.keys(body).length === 0) {
      response.status(400).json({ message: "Request body cannot be empty" });
    }
  } catch (error) {
    if (error) {
    }
  }
};
