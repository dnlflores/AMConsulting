import prisma from "@/lib/prisma";
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    const { firstName, lastName, username, email, password, avatar } = req.body;
    const encryptedPassword = bcrypt.hashSync(password);

    const result = await prisma.user.create({
        data: {
            firstName,
            lastName,
            username,
            email,
            password: encryptedPassword,
            avatar
        }
    });

    delete result.password;
    return res.json(result);
}