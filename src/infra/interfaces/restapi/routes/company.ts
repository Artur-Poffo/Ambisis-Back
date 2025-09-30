import { CreateCompanyUseCase } from "@/domain/application/usecases/create-company";
import { PrismaCompanyRepository } from "@/infra/database/repositories/prisma/company";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function companyRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.post("/", async (request, reply) => {
    const createCompanySchema = z.object({
      companyName: z.string(),
      cnpj: z.string(),
      zipCode: z.string(),
      city: z.string(),
      state: z.string(),
      neighborhood: z.string(),
      street: z.string(),
      complement: z.string().optional().nullable(),
    });

    const companyRepository = new PrismaCompanyRepository();
    const createCompanyUseCase = new CreateCompanyUseCase(companyRepository);

    const parsedBody = createCompanySchema.safeParse(request.body);
    if (!parsedBody.success) return reply.status(400).send(parsedBody.error);

    await createCompanyUseCase.execute({
      companyName: parsedBody.data.companyName,
      cnpj: parsedBody.data.cnpj,

      zipCode: parsedBody.data.zipCode,
      city: parsedBody.data.city,
      state: parsedBody.data.state,
      neighborhood: parsedBody.data.neighborhood,
      street: parsedBody.data.street,
      complement: parsedBody.data.complement ?? undefined,
    });
  });

  fastify.put("/:companyId", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.delete("/:companyId", async (request, reply) => {
    return { hello: "world" };
  });
}
