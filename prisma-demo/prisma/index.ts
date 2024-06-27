// We don't want to create multiple instance of prisma so we have not kept it in schema.prisma file
// Here it will only get created once and we can use it anywhere by importing prisma
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const main = async () => {
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Ayushi Shah",
  //       email: "ayushishah@gmail.com",
  //       password: "123",
  //       role: "ADMIN",
  //     },
  //   });
  //    *************************************************
  //   const user = await prisma.user.createMany({
  //     data: [
  //       {
  //         name: "Ayushi Shah",
  //         email: "ayushishah2@gmail.com",
  //         password: "123",
  //         role: "ADMIN",
  //       },
  //       {
  //         name: "Test 1",
  //         email: "test1@gmail.com",
  //         password: "123",
  //         role: "ADMIN",
  //       },
  //       {
  //         name: "Test 2",
  //         email: "test2@gmail.com",
  //         password: "123",
  //         role: "ADMIN",
  //       },
  //       {
  //         name: "Test 3",
  //         email: "test3@gmail.com",
  //         password: "1234",
  //         role: "ADMIN",
  //       },
  //     ],
  //   });
  //   console.log(user);
  //    *************************************************
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       email: "test2@gmail.com",
  //     },
  //   });
  //   console.log(user);
  //   //    *************************************************
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       name_password: {
  //         name: "Test 3",
  //         password: "1234",
  //       },
  //     },
  //   });
  //   console.log(user);
  //   //    *************************************************
  //   const user = await prisma.user.findFirst({
  //     where: {
  //       name: {
  //         contains: "test",
  //         mode: "insensitive",
  //       },
  //     },
  //   });
  //   console.log(user);
  //   //    *************************************************
  //   const user = await prisma.user.findMany({
  //     where: {
  //       name: {
  //         contains: "test",
  //         mode: "insensitive",
  //       },
  //     },
  //   });
  //   console.log(user);
  // //    *************************************************
  // const user = await prisma.user.findMany({
  //   where: {
  //     name: {
  //       contains: "test",
  //       mode: "insensitive",
  //     },
  //   },
  //   take: 1, // pagination
  //   skip: 1,
  //   // select: {
  //   //   name: true,
  //   //   email: true,
  //   // },
  // });
  // console.log(user);
  //    *************************************************

  // await prisma.post.createMany({
  //   data: [
  //     {
  //       slug: "test",
  //       title: "Test 1233",
  //       body: "hello world",
  //       rating: 2,
  //       userId: "664ecf24470cae7d38dbf5a6",
  //     },
  //   ],
  // });

  // const user = await prisma.user.findMany({
  //   where: {
  //     name: {
  //       contains: "test",
  //       mode: "insensitive",
  //     },
  //   },
  //   orderBy: {
  //     name: "asc",
  //   },
  //   include: {
  //     posts: true,
  //   },
  // });
  // console.log(user);

  // //    *************************************************
  const user = await prisma.user.findMany({
    where: {
      OR: [
        {
          posts: {
            rating: {
              gte: 2,
            },
          },
        },
        {
          posts: {
            title: {
              contains: "test",
              mode: "insensitive",
            },
          },
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
    include: {
      posts: true,
    },
  });
  console.log(user);
};
main()
  .then(() => {
    console.log("executed");
  })
  .catch((e) => {
    console.log("error: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
