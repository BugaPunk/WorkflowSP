// Enumeración para roles de proyecto
export enum ProjectRole {
  PRODUCT_OWNER = "product_owner",
  SCRUM_MASTER = "scrum_master",
  TEAM_MEMBER = "team_member",
}

// Enumeración para estados de proyecto
export enum ProjectStatus {
  ACTIVE = "active",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

// Interfaz para proyectos
export interface Project {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  status?: ProjectStatus | string;
}

// Interfaz para miembros de proyecto
export interface ProjectMember {
  id: number;
  userId: number;
  projectId: number;
  role: ProjectRole;
  username?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interfaz para crear un proyecto
export interface CreateProjectInput {
  name: string;
  description?: string;
  ownerId: number;
}

// Interfaz para actualizar un proyecto
export interface UpdateProjectInput {
  name?: string;
  description?: string;
}

// Interfaz para asignar un usuario a un proyecto
export interface AssignProjectMemberInput {
  userId: number;
  projectId: number;
  role: ProjectRole;
}