import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { getAllExams, getExamsByDiscipline, createExam, deleteExam } from "../db";
import { storagePut } from "../storage";
import { TRPCError } from "@trpc/server";

export const examsRouter = router({
  // Get all exams (public)
  listAll: publicProcedure.query(async () => {
    return getAllExams();
  }),

  // Get exams by discipline (public)
  listByDiscipline: publicProcedure
    .input(z.object({ disciplineId: z.number() }))
    .query(async ({ input }) => {
      return getExamsByDiscipline(input.disciplineId);
    }),

  // Upload exam PDF (admin only)
  upload: protectedProcedure
    .input(
      z.object({
        disciplineId: z.number(),
        title: z.string().min(1),
        year: z.number().min(2000).max(new Date().getFullYear()),
        type: z.enum(["frequency", "final", "resource"]),
        fileData: z.string(), // base64 encoded file data
        fileName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can upload exams",
        });
      }

      try {
        // Convert base64 to buffer
        const buffer = Buffer.from(input.fileData, "base64");

        // Upload to storage
        const { url, key } = await storagePut(
          `exams/${input.disciplineId}/${Date.now()}-${input.fileName}`,
          buffer,
          "application/pdf"
        );

        // Save to database
        const exam = await createExam({
          disciplineId: input.disciplineId,
          title: input.title,
          year: input.year,
          type: input.type,
          fileKey: key,
          fileUrl: url,
          uploadedBy: ctx.user.id,
        });

        return exam;
      } catch (error) {
        console.error("Failed to upload exam:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload exam file",
        });
      }
    }),

  // Delete exam (admin only)
  delete: protectedProcedure
    .input(z.object({ examId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can delete exams",
        });
      }

      try {
        await deleteExam(input.examId);
        return { success: true };
      } catch (error) {
        console.error("Failed to delete exam:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete exam",
        });
      }
    }),
});
