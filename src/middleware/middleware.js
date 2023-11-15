import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const userSession = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_CODE);
      const user = await prisma.User.findUnique({
        where: {
          id_user: decoded.id_user,
        },
      });

      if (user) {
        // define user value from token in request
        req.user = {
          id: user.id_user,
          username: user.username,
        };
        next();
      } else {
        res.status(403).send({
          status: false,
          error: "Not Authorize",
        });
      }
    } catch (error) {
      //   console.log("UserSession middleware helpers error: ", error);
      res.status(403).send({
        status: false,
        error: "Not Authorize or invalid token",
      });
    }
  }

  if (!token) {
    res.status(401).send({
      status: false,
      error: "Not Authorize, No Token",
    });
  }
};

export { userSession };
