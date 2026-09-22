import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export async function writeAuditLog(input: { actorUserId: number; action: string; entity: string; entityId?: string | number; metadata?: Prisma.InputJsonValue }, tx: Prisma.TransactionClient = prisma) { await tx.auditLog.create({ data: { actorUserId: input.actorUserId, action: input.action, entity: input.entity, entityId: input.entityId === undefined ? null : String(input.entityId), metadata: input.metadata } }); }
