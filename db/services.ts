import { db } from "./db.ts";
import { eq } from "drizzle-orm";
import * as schema from "./schema.ts";

// User services
export async function createUser(userData: Omit<typeof schema.users.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.users).values(userData).returning();
}

export async function getUserById(id: number) {
  return await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
}

export async function getUserByEmail(email: string) {
  return await db.select().from(schema.users).where(eq(schema.users.email, email));
}

export async function getAllUsers() {
  return await db.select().from(schema.users);
}

export async function updateUser(id: number, userData: Partial<Omit<typeof schema.users.$inferInsert, "id" | "createdAt" | "updatedAt">>) {
  return await db.update(schema.users)
    .set({
      ...userData,
      updatedAt: new Date()
    })
    .where(eq(schema.users.id, id))
    .returning();
}

export async function deleteUser(id: number) {
  return await db.delete(schema.users)
    .where(eq(schema.users.id, id))
    .returning();
}

export async function validateUserCredentials(email: string, password: string) {
  const users = await getUserByEmail(email);
  if (users.length === 0) {
    return null;
  }

  const user = users[0];
  // In a real application, you would hash the password and compare it with the stored hash
  // For now, we'll just compare the plain text passwords
  if (user.password !== password) {
    return null;
  }

  return user;
}

// Project services
export async function createProject(projectData: Omit<typeof schema.projects.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.projects).values(projectData).returning();
}

export async function getProjectById(id: number) {
  return await db.select().from(schema.projects).where(eq(schema.projects.id, id)).limit(1);
}

export async function getAllProjects() {
  return await db.select().from(schema.projects);
}

export async function getProjectsByOwnerId(ownerId: number) {
  return await db.select().from(schema.projects).where(eq(schema.projects.ownerId, ownerId));
}

export async function updateProject(id: number, projectData: Partial<Omit<typeof schema.projects.$inferInsert, "id" | "createdAt" | "updatedAt">>) {
  return await db.update(schema.projects).set({
    ...projectData,
    updatedAt: new Date()
  }).where(eq(schema.projects.id, id)).returning();
}

export async function deleteProject(id: number) {
  return await db.delete(schema.projects).where(eq(schema.projects.id, id)).returning();
}

// Team services
export async function createTeam(teamData: Omit<typeof schema.teams.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.teams).values(teamData).returning();
}

export async function getTeamById(id: number) {
  return await db.select().from(schema.teams).where(eq(schema.teams.id, id)).limit(1);
}

export async function getTeamsByProjectId(projectId: number) {
  return await db.select().from(schema.teams).where(eq(schema.teams.projectId, projectId));
}

// Team member services
export async function addTeamMember(teamMemberData: Omit<typeof schema.teamMembers.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.teamMembers).values(teamMemberData).returning();
}

export async function getTeamMembersByTeamId(teamId: number) {
  return await db.select().from(schema.teamMembers).where(eq(schema.teamMembers.teamId, teamId));
}

// Sprint services
export async function createSprint(sprintData: Omit<typeof schema.sprints.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.sprints).values(sprintData).returning();
}

export async function getSprintById(id: number) {
  return await db.select().from(schema.sprints).where(eq(schema.sprints.id, id)).limit(1);
}

export async function getSprintsByProjectId(projectId: number) {
  return await db.select().from(schema.sprints).where(eq(schema.sprints.projectId, projectId));
}

// Task services
export async function createTask(taskData: Omit<typeof schema.tasks.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.tasks).values(taskData).returning();
}

export async function getTaskById(id: number) {
  return await db.select().from(schema.tasks).where(eq(schema.tasks.id, id)).limit(1);
}

export async function getTasksBySprintId(sprintId: number) {
  return await db.select().from(schema.tasks).where(eq(schema.tasks.sprintId, sprintId));
}

export async function getTasksByAssigneeId(assigneeId: number) {
  return await db.select().from(schema.tasks).where(eq(schema.tasks.assigneeId, assigneeId));
}

// Comment services
export async function createComment(commentData: Omit<typeof schema.comments.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.comments).values(commentData).returning();
}

export async function getCommentsByTaskId(taskId: number) {
  return await db.select().from(schema.comments).where(eq(schema.comments.taskId, taskId));
}

// Evaluation services
export async function createEvaluation(evaluationData: Omit<typeof schema.evaluations.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  return await db.insert(schema.evaluations).values(evaluationData).returning();
}

export async function getEvaluationsByTeamId(teamId: number) {
  return await db.select().from(schema.evaluations).where(eq(schema.evaluations.teamId, teamId));
}

export async function getEvaluationsByProjectId(projectId: number) {
  return await db.select().from(schema.evaluations).where(eq(schema.evaluations.projectId, projectId));
}
