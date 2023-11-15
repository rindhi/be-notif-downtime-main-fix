import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import joi from "joi";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      const errorDetails = validation.error.details.map(
        (detail) => detail.message
      );

      res.status(422).json({ msg: errorDetails });
    }
    //cari user dengan email
    const user = await prisma.User.findFirst({
      where: {
        username: req.body.username,
      },
    });

    //kalu user tidak ada
    if (!user) {
      res.status(404).json({ msg: "user not found" });
    }
    //kalau user adaa check password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401).json({ msg: "password user salah" });
    }
    const payload = {
      id_user: user.id_user,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.TOKEN_CODE, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "success", token: token });
  } catch (error) {
    console.error("login auth module error", error);
    res.status(500).json({ msg: "login auth module error" });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers["Bearer"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: "You have been Logged Out" });
    } else {
      res.send({ msg: "Error" });
    }
  });
};

export { login, logout };
