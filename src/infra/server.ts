import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.listen({ port: 3333 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.info(`🚀 Server listening on ${address}`);
});
