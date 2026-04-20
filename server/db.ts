import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, disciplines, questions, userScores, exams, Discipline, Question, UserScore, Exam } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== QUIZ HELPERS =====

export async function getDisciplines(): Promise<Discipline[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(disciplines);
}

export async function getQuestionsByDiscipline(disciplineId: number): Promise<Question[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(questions).where(eq(questions.disciplineId, disciplineId));
}

export async function getUserScore(userId: number, disciplineId: number): Promise<UserScore | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userScores).where(
    and(eq(userScores.userId, userId), eq(userScores.disciplineId, disciplineId))
  ).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserScore(
  userId: number,
  disciplineId: number,
  isCorrect: boolean
): Promise<UserScore> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserScore(userId, disciplineId);
  const now = new Date();

  if (existing) {
    const updated = await db.update(userScores)
      .set({
        score: existing.score + (isCorrect ? 10 : 0),
        totalAttempts: existing.totalAttempts + 1,
        correctAnswers: existing.correctAnswers + (isCorrect ? 1 : 0),
        lastAttemptAt: now,
        updatedAt: now,
      })
      .where(
        and(eq(userScores.userId, userId), eq(userScores.disciplineId, disciplineId))
      );
    
    const result = await getUserScore(userId, disciplineId);
    return result!;
  } else {
    await db.insert(userScores).values({
      userId,
      disciplineId,
      score: isCorrect ? 10 : 0,
      totalAttempts: 1,
      correctAnswers: isCorrect ? 1 : 0,
      lastAttemptAt: now,
    });
    
    const result = await getUserScore(userId, disciplineId);
    return result!;
  }
}

export async function getUserGlobalScore(userId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  
  const result = await db.select().from(userScores).where(eq(userScores.userId, userId));
  return result.reduce((sum, score) => sum + score.score, 0);
}

// ===== EXAM HELPERS =====

export async function getExamsByDiscipline(disciplineId: number): Promise<Exam[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(exams)
    .where(eq(exams.disciplineId, disciplineId))
    .orderBy(desc(exams.year));
}

export async function getAllExams(): Promise<Exam[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(exams).orderBy(desc(exams.year));
}

export async function createExam(exam: {
  disciplineId: number;
  title: string;
  year: number;
  type: 'frequency' | 'final' | 'resource';
  fileKey: string;
  fileUrl: string;
  uploadedBy: number;
}): Promise<Exam> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(exams).values(exam);
  const newExam = await db.select().from(exams)
    .where(eq(exams.id, result[0].insertId as number))
    .limit(1);
  
  return newExam[0]!;
}

export async function deleteExam(examId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(exams).where(eq(exams.id, examId));
}
