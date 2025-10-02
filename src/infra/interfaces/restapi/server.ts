import Fastify from "fastify";
import { companyRoutes } from "./routes/company";
import { environmentalLicenseRoutes } from "./routes/environmental-license";
import cors from "@fastify/cors";

const fastify = Fastify();

// Esta configuração de CORS permite que qualquer IP acesse nossa API livremente.
// Em aplicações reais, isso não é recomendado, mas para este caso específico, é suficiente.
fastify.register(cors, {
  methods: ["GET", "POST", "PUT", "DELETE"],
});

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
