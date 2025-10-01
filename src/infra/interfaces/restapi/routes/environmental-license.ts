import type { FastifyInstance } from "fastify";

export async function environmentalLicenseRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (_request, reply) => {});

  fastify.post("/", async (request, reply) => {});

  fastify.put("/:companyId", async (request, reply) => {});

  fastify.delete("/:companyId", async (request, reply) => {});
}
