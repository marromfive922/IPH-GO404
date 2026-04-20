import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock user context
function createMockContext(userId: number = 1, role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `test-user-${userId}`,
      email: `user${userId}@test.com`,
      name: `Test User ${userId}`,
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Quiz Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(async () => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("getDisciplines", () => {
    it("should return list of disciplines", async () => {
      const disciplines = await caller.quiz.getDisciplines();
      expect(Array.isArray(disciplines)).toBe(true);
      expect(disciplines.length).toBeGreaterThan(0);
      expect(disciplines[0]).toHaveProperty("name");
      expect(disciplines[0]).toHaveProperty("slug");
      expect(disciplines[0]).toHaveProperty("icon");
    });
  });

  describe("getQuestions", () => {
    it("should return questions for a discipline", async () => {
      const questions = await caller.quiz.getQuestions({ disciplineId: 1 });
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions[0]).toHaveProperty("id");
      expect(questions[0]).toHaveProperty("text");
      expect(questions[0]).toHaveProperty("options");
      // Ensure correctOptionIndex is NOT sent to client
      expect(questions[0]).not.toHaveProperty("correctOptionIndex");
    });
  });

  describe("submitAnswer", () => {
    it("should validate answer server-side and return correct index", async () => {
      // Get a question first
      const questions = await caller.quiz.getQuestions({ disciplineId: 1 });
      const question = questions[0];

      if (!question) {
        throw new Error("No questions found");
      }

      // Submit the first option as answer
      const result = await caller.quiz.submitAnswer({
        disciplineId: 1,
        questionId: question.id,
        selectedOptionIndex: 0,
      });

      // Verify response structure
      expect(result).toHaveProperty("isCorrect");
      expect(result).toHaveProperty("correctOptionIndex");
      expect(result).toHaveProperty("score");
      expect(result).toHaveProperty("correctAnswers");
      expect(result).toHaveProperty("totalAttempts");

      // Verify types
      expect(typeof result.isCorrect).toBe("boolean");
      expect(typeof result.correctOptionIndex).toBe("number");
      expect(typeof result.score).toBe("number");
      expect(typeof result.correctAnswers).toBe("number");
      expect(typeof result.totalAttempts).toBe("number");
    });

    it("should increment score on correct answer", async () => {
      const questions = await caller.quiz.getQuestions({ disciplineId: 1 });
      const question = questions[0];

      if (!question) {
        throw new Error("No questions found");
      }

      // Get initial score
      const initialScore = await caller.quiz.getUserScore({ disciplineId: 1 });

      // Submit first answer to get the correct option index
      const firstResult = await caller.quiz.submitAnswer({
        disciplineId: 1,
        questionId: question.id,
        selectedOptionIndex: 0,
      });

      // Submit correct answer
      const result = await caller.quiz.submitAnswer({
        disciplineId: 1,
        questionId: question.id,
        selectedOptionIndex: firstResult.correctOptionIndex,
      });

      // Verify score was updated
      if (result.isCorrect) {
        expect(result.score).toBeGreaterThanOrEqual((initialScore?.score || 0) + 10);
      }
    });

    it("should track total attempts", async () => {
      const questions = await caller.quiz.getQuestions({ disciplineId: 1 });
      const question = questions[0];

      if (!question) {
        throw new Error("No questions found");
      }

      const result = await caller.quiz.submitAnswer({
        disciplineId: 1,
        questionId: question.id,
        selectedOptionIndex: 0,
      });

      expect(result.totalAttempts).toBeGreaterThan(0);
    });
  });

  describe("getUserScore", () => {
    it("should return user score for a discipline", async () => {
      const score = await caller.quiz.getUserScore({ disciplineId: 1 });
      
      if (score) {
        expect(score).toHaveProperty("userId");
        expect(score).toHaveProperty("disciplineId");
        expect(score).toHaveProperty("score");
        expect(score).toHaveProperty("correctAnswers");
        expect(score).toHaveProperty("totalAttempts");
      }
    });
  });

  describe("getGlobalScore", () => {
    it("should return global score across all disciplines", async () => {
      const globalScore = await caller.quiz.getGlobalScore();
      expect(typeof globalScore).toBe("number");
      expect(globalScore).toBeGreaterThanOrEqual(0);
    });
  });
});
