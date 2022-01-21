import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET);

  await Session.createNew(user.id, token);

  return {
    user: user.getMainAtributes(),
    token
  };
}
