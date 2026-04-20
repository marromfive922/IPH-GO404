import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getDisciplines,
  getQuestionsByDiscipline,
  getUserScore,
  updateUserScore,
  getUserGlobalScore,
} from "../db";

export const quizRouter = router({
  // Get all disciplines
  getDisciplines: publicProcedure.query(async () => {
    return getDisciplines();
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
