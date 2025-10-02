import { CreateEnvironmentalLicenseUseCase } from "@/domain/application/usecases/create-environmental-license";
import { PrismaEnvironmentalLicenseRepository } from "@/infra/database/repositories/prisma/environmental-license";
import type { FastifyInstance } from "fastify";
import z from "zod";
import { RestApiEnvironmentalLicensePresenter } from "../presenters/environmental-license";
import { UpdateEnvironmentalLicenseUseCase } from "@/domain/application/usecases/update-environmental-license";
import { DeleteEnvironmentalLicense } from "@/domain/application/usecases/delete-environmental-license";
import { ListAllEnvironmentalLicensesUseCase } from "@/domain/application/usecases/list-all-environmental-licenses";

export async function environmentalLicenseRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const listAllEnvironmentalLicensesParamsSchema = z.object({
      companyId: z.string().optional().nullable(),
    });

    const parsedQuery = listAllEnvironmentalLicensesParamsSchema.safeParse(
      request.query
    );

    if (!parsedQuery.success) return reply.status(400).send(parsedQuery.error);

    const environmentalLicenseRepository =
      new PrismaEnvironmentalLicenseRepository();
    const listAllEnvironmentalLicensesUseCase =
      new ListAllEnvironmentalLicensesUseCase(environmentalLicenseRepository);

    const { environmentalLicenses } =
      await listAllEnvironmentalLicensesUseCase.execute({
        companyId: parsedQuery.data.companyId || undefined,
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

  fastify.put("/:licenseId", async (request, reply) => {
    const updateEnvironmentalLicenseParamsSchema = z.object({
      licenseId: z.string(),
    });

    const updateEnvironmentalLicenseBodySchema = z.object({
      licenseNumber: z.string().optional().nullable(),
      environmentalAgency: z.string().optional().nullable(),
      issuedAt: z.string().optional().nullable(),
      validUntil: z.string().optional().nullable(),
    });

    const environmentalLicenseRepository =
      new PrismaEnvironmentalLicenseRepository();
    const updateEnvironmentalLicenseUseCase =
      new UpdateEnvironmentalLicenseUseCase(environmentalLicenseRepository);

    const parsedParams = updateEnvironmentalLicenseParamsSchema.safeParse(
      request.params
    );
    const parsedBody = updateEnvironmentalLicenseBodySchema.safeParse(
      request.body
    );

    if (!parsedParams.success || !parsedBody.success)
      return reply.status(400).send(parsedParams.error || parsedBody.error);

    await updateEnvironmentalLicenseUseCase.execute({
      licenseId: parsedParams.data.licenseId,

      licenseNumber: parsedBody.data.licenseNumber || undefined,
      environmentalAgency: parsedBody.data.environmentalAgency || undefined,

      issuedAt: parsedBody.data.issuedAt
        ? new Date(parsedBody.data.issuedAt)
        : undefined,
      validUntil: parsedBody.data.validUntil
        ? new Date(parsedBody.data.validUntil)
        : undefined,
    });

    reply.status(204).send();
  });

  fastify.delete("/:licenseId", async (request, reply) => {
    const deleteEnvironmentalLicenseParamsSchema = z.object({
      licenseId: z.string(),
    });

    const environmentalLicenseRepository =
      new PrismaEnvironmentalLicenseRepository();
    const deleteEnvironmentalLicenseUseCase = new DeleteEnvironmentalLicense(
      environmentalLicenseRepository
    );

    const parsedParams = deleteEnvironmentalLicenseParamsSchema.safeParse(
      request.params
    );

    if (!parsedParams.success)
      return reply.status(400).send(parsedParams.error);

    await deleteEnvironmentalLicenseUseCase.execute({
      licenseId: parsedParams.data.licenseId,
    });

    reply.status(204).send();
  });
}
