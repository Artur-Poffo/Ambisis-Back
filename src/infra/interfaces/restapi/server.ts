import Fastify from "fastify";
import { companyRoutes } from "./routes/company";
import { environmentalLicenseRoutes } from "./routes/environmental-license";

const fastify = Fastify();

fastify.get("/", async (request, reply) => {
  return { message: "Welcome to Ambisis API" };
});

fastify.register(companyRoutes, {
  prefix: "/companies",
});

fastify.register(environmentalLicenseRoutes, {
  prefix: "/environmental-licenses",
});

fastify.listen({ port: 3333 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.info(`🚀 Server listening on ${address}`);
});
