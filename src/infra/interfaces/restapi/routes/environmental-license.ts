import { CreateEnvironmentalLicenseUseCase } from "@/domain/application/usecases/create-environmental-license";
import { ListAllEnvironmentalLicensesFromCompanyUseCase } from "@/domain/application/usecases/list-all-environmental-license-from-company";
import { PrismaEnvironmentalLicenseRepository } from "@/infra/database/repositories/prisma/environmental-license";
import type { FastifyInstance } from "fastify";
import z from "zod";
import { RestApiEnvironmentalLicensePresenter } from "../presenters/environmental-license";

export async function environmentalLicenseRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const listAllEnvironmentalLicensesParamsSchema = z.object({
      companyId: z.string(),
    });

    const parsedQuery = listAllEnvironmentalLicensesParamsSchema.safeParse(
      request.query
    );

    if (!parsedQuery.success) return reply.status(400).send(parsedQuery.error);

    const environmentalLicenseRepository =
      new PrismaEnvironmentalLicenseRepository();
    const listAllEnvironmentalLicensesUseCase =
      new ListAllEnvironmentalLicensesFromCompanyUseCase(
        environmentalLicenseRepository
      );

    const { environmentalLicenses } =
      await listAllEnvironmentalLicensesUseCase.execute({
        companyId: parsedQuery.data.companyId,
      });

    reply.status(200).send({
      environmentalLicenses: environmentalLicenses.map((license) =>
        RestApiEnvironmentalLicensePresenter.toRestApiResponse(license)
      ),
    });
  });

  fastify.post("/", async (request, reply) => {
    const createEnvironmentalLicenseBodySchema = z.object({
      licenseNumber: z.string(),
      environmentalAgency: z.string(),
      companyId: z.string(),

      issuedAt: z.string(),
      validUntil: z.string(),
    });

    const environmentalLicenseRepository =
      new PrismaEnvironmentalLicenseRepository();
    const createEnvironmentalLicenseUseCase =
      new CreateEnvironmentalLicenseUseCase(environmentalLicenseRepository);

    const parsedBody = createEnvironmentalLicenseBodySchema.safeParse(
      request.body
    );
    if (!parsedBody.success) return reply.status(400).send(parsedBody.error);

    const { licenseId } = await createEnvironmentalLicenseUseCase.execute({
      licenseNumber: parsedBody.data.licenseNumber,
      environmentalAgency: parsedBody.data.environmentalAgency,
      companyId: parsedBody.data.companyId,
      issuedAt: new Date(parsedBody.data.issuedAt),
      validUntil: new Date(parsedBody.data.validUntil),
    });

    reply.status(201).send({
      licenseId,
    });
  });

  fastify.put("/:licenseId", async (request, reply) => {});

  fastify.delete("/:licenseId", async (request, reply) => {});
}
