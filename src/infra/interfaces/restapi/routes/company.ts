import { CreateCompanyUseCase } from "@/domain/application/usecases/create-company";
import { ListAllCompaniesUseCase } from "@/domain/application/usecases/list-all-companies";
import { PrismaCompanyRepository } from "@/infra/database/repositories/prisma/company";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { RestApiCompanyPresenter } from "../presenters/company";
import { UpdateCompanyUseCase } from "@/domain/application/usecases/update-company";

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
    const createCompanyBodySchema = z.object({
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

    const parsedBody = createCompanyBodySchema.safeParse(request.body);
    if (!parsedBody.success) return reply.status(400).send(parsedBody.error);

    const { companyId } = await createCompanyUseCase.execute({
      companyName: parsedBody.data.companyName,
      cnpj: parsedBody.data.cnpj,
      zipCode: parsedBody.data.zipCode,
      city: parsedBody.data.city,
      state: parsedBody.data.state,
      neighborhood: parsedBody.data.neighborhood,
      street: parsedBody.data.street,
      complement: parsedBody.data.complement ?? undefined,
    });

    reply.status(201).send({
      companyId,
    });
  });

  fastify.put("/:companyId", async (request, reply) => {
    const updateCompanyParamsSchema = z.object({
      companyId: z.string(),
    });

    const updateCompanyBodySchema = z.object({
      companyName: z.string().optional().nullable(),
      cnpj: z.string().optional().nullable(),
      zipCode: z.string().optional().nullable(),
      city: z.string().optional().nullable(),
      state: z.string().optional().nullable(),
      neighborhood: z.string().optional().nullable(),
      street: z.string().optional().nullable(),
      complement: z.string().optional().nullable(),
    });

    const companyRepository = new PrismaCompanyRepository();
    const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository);

    const parsedParams = updateCompanyParamsSchema.safeParse(request.params);
    const parsedBody = updateCompanyBodySchema.safeParse(request.body);

    if (!parsedParams.success || !parsedBody.success)
      return reply.status(400).send(parsedParams.error);

    await updateCompanyUseCase.execute({
      companyId: parsedParams.data.companyId,

      companyName: parsedBody.data.companyName || undefined,
      cnpj: parsedBody.data.cnpj || undefined,
      zipCode: parsedBody.data.zipCode || undefined,
      city: parsedBody.data.city || undefined,
      state: parsedBody.data.state || undefined,
      neighborhood: parsedBody.data.neighborhood || undefined,
      street: parsedBody.data.street || undefined,
      complement: parsedBody.data.complement || undefined,
    });

    reply.status(204);
  });

  fastify.delete("/:companyId", async (request, reply) => {
    return { hello: "world" };
  });
}
