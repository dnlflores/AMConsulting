import prisma from "@/lib/prisma";
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    const { credential, password } = req.body;

    // const user = await prisma.user.findMany({
    //     where: {
    //         OR: [
    //             {
    //                 email: credential
    //             },
    //             {
    //                 username: credential
    //             }
    //         ]
    //     }
    // });

    let user = await prisma.user.findFirst({
        where: {
            email: credential
        }
    });

    if (!user) user = await prisma.user.findFirst({
        where: {
            username: credential
        }
    })

    console.log("user => ", user);

    if (user) {
        if (bcrypt.compareSync(password, user.password.toString())) {
            delete user.password;
            return res.json(user)
        }
    }

    return res.status(404).json({
        errors: {
            credentials: "Invalid Credentials."
        }
    });
}