import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  /* receber o token */
  const authToken = request.headers.authorization;

  /* validar se o token está preenchido */
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    /* verificar se o token é válido */
    const { sub } = verify(token, "454d113f6530555446de8455fd0be608") as IPayload;

    /* recuperar informações do usuário */
    request.user_id = sub;

    return next();
  } catch(err) {
    return response.status(401).end();
  }
}