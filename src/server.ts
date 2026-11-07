import app from "./app";
import { prisma } from "./app/lib/prisma";

const port = 5000;
const main = async () => {
  await prisma.$connect();
  console.log("database connet succefully");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
