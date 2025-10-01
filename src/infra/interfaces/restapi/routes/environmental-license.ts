import { CreateEnvironmentalLicenseUseCase } from "@/domain/application/usecases/create-environmental-license";
import { PrismaEnvironmentalLicenseRepository } from "@/infra/database/repositories/prisma/environmental-license";
import type { FastifyInstance } from "fastify";
import z from "zod";

export async function environmentalLicenseRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (_request, reply) => {});

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
