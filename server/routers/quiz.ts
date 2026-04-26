import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getDisciplines,
  getQuestionsByDiscipline,
  getUserScore,
  updateUserScore,
  getUserGlobalScore,
  createDiscipline,
} from "../db";

export const quizRouter = router({
  // Get all disciplines
  getDisciplines: publicProcedure.query(async () => {
    return getDisciplines();
  }),

  // Create a new discipline (admin only)
  createDiscipline: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        icon: z.string().default('fa-book'),
        description: z.string().default(''),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only administrators can create disciplines',
        });
      }

      try {
        const discipline = await createDiscipline(
          input.name,
          input.slug,
          input.icon,
          input.description
        );
        return discipline;
      } catch (error) {
        if ((error as any).code === 'ER_DUP_ENTRY') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Disciplina com este slug ja existe',
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao criar disciplina',
        });
      }
    }),

  // Get questions for a specific discipline
  getQuestions: publicProcedure.input(z.object({ disciplineId: z.number() })).query(async ({ input }) => {
    const questions = await getQuestionsByDiscipline(input.disciplineId);
    // Shuffle questions and remove correct answer index from client
    return questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options,
      explanation: q.explanation,
      // Don't send correctOptionIndex to client
    }));
  }),

  // Submit an answer and update score
  submitAnswer: protectedProcedure
    .input(
      z.object({
        disciplineId: z.number(),
        questionId: z.number(),
        selectedOptionIndex: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get the question from database to validate answer server-side
      const questions = await getQuestionsByDiscipline(input.disciplineId);
      const question = questions.find((q) => q.id === input.questionId);

      if (!question) {
        throw new Error("Question not found");
      }

      // Validate answer server-side using the correct answer from database
      const isCorrect = input.selectedOptionIndex === question.correctOptionIndex;
      const updatedScore = await updateUserScore(ctx.user.id, input.disciplineId, isCorrect);

      return {
        isCorrect,
        correctOptionIndex: question.correctOptionIndex,
        explanation: question.explanation,
        score: updatedScore.score,
        correctAnswers: updatedScore.correctAnswers,
        totalAttempts: updatedScore.totalAttempts,
      };
    }),

  // Get user's score for a specific discipline
  getUserScore: protectedProcedure
    .input(z.object({ disciplineId: z.number() }))
    .query(async ({ ctx, input }) => {
      return getUserScore(ctx.user.id, input.disciplineId);
    }),

  // Get user's global score across all disciplines
  getGlobalScore: protectedProcedure.query(async ({ ctx }) => {
    return getUserGlobalScore(ctx.user.id);
  }),
});
