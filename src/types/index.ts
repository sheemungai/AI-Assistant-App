import type { Difficulty, QuestionType, Role } from "#/apis/questions";
import type { ExperienceLevel, TargetRole } from "#/apis/users";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  full_name?: string;
}

export interface AuthResponse {
  user: AuthUser;
  refresh: string;
  access: string;
  user_type: "admin" | "user";
  message: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface Profile {
  username: string;
  email: string;
  user_type: "admin" | "user";
  profile: Record<string, unknown>;
}

export interface Profile {
  id: number;
  user: number;
  username: string;       // read-only (source: user.username)
  email: string;
  full_name: string;
  target_role: TargetRole  | null;
  experience_level: ExperienceLevel | null;
  created_at: string;     // read-only
  updated_at: string;     // read-only
}

export interface UpdateProfilePayload {
  email?: string;
  full_name?: string;
  target_role?: TargetRole | null;
  experience_level?: ExperienceLevel | null;
}

export interface SampleAnswer {
    id: number;
    is_ideal: boolean;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface CreateSampleAnswerPayload {
    question_id: number;
    content: string;
    is_ideal: boolean;
}

export interface Question {
    id: number;
    title: string;
    description: string;
    topic: string;
    difficulty: Difficulty;
    question_type: QuestionType;
    role: Role;
    sample_answers: SampleAnswer[];
    created_at: string;
    updated_at: string;
}

export interface CreateQuestionPayload {
    title: string;
    description: string;
    topic: string;
    difficulty?: Difficulty;
    question_type?: QuestionType;
    role?: Role;
}