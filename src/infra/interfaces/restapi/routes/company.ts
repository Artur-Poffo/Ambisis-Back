import { CreateCompanyUseCase } from "@/domain/application/usecases/create-company";
import { ListAllCompaniesUseCase } from "@/domain/application/usecases/list-all-companies";
import { PrismaCompanyRepository } from "@/infra/database/repositories/prisma/company";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { RestApiCompanyPresenter } from "../presenters/company";

export async function companyRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (_request, reply) => {
    const companyRepository = new PrismaCompanyRepository();
    const listAllCompaniesUseCase = new ListAllCompaniesUseCase(
      companyRepository
    );

    const { companies } = await listAllCompaniesUseCase.execute();

    reply.status(200).send({
      companies: companies.map((company) =>
        RestApiCompanyPresenter.toRestApiResponse(company)
      ),
    });
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

    reply.status(201);
  });

  fastify.put("/:companyId", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.delete("/:companyId", async (request, reply) => {
    return { hello: "world" };
  });
}
