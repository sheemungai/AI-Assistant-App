import type { Answer, CreateAnswerSubmissionPayload, CreateInterviewSessionPayload,  InterviewSession } from "../types";
import { client } from "./client";

const ANSWERSUBMISSION_BASE = '/interviews/answers'
const BASE = '/interviews/interview-sessions'

export type Status = 'pending' | 'in_progress' | 'completed';

export const answerSubmissionApi = {
    list: () => client.get<Answer[]>(`${ANSWERSUBMISSION_BASE}/`),
    get: (id: number) => client.get<Answer>(`${ANSWERSUBMISSION_BASE}/${id}/`),
    create: (data: CreateAnswerSubmissionPayload) => client.post<Answer>(`${ANSWERSUBMISSION_BASE}/`, data),
    update: (id: number, data: Partial<CreateAnswerSubmissionPayload>) => client.patch<Answer>(`${ANSWERSUBMISSION_BASE}/${id}/`, data),
    delete: (id: number) => client.delete<void>(`${ANSWERSUBMISSION_BASE}/${id}/`),
}

export const interviewSessionApi = {
  list: () => client.get<InterviewSession[]>(`${BASE}/`),
  get: (id: number) => client.get<InterviewSession>(`${BASE}/${id}/`),
  create: (data: CreateInterviewSessionPayload) => client.post<InterviewSession>(`${BASE}/`, data),
  update: (id: number, data: Partial<CreateInterviewSessionPayload>) => client.patch<InterviewSession>(`${BASE}/${id}/`, data),
  delete: (id: number) => client.delete<void>(`${BASE}/${id}/`),
  start: (id: number) => client.post<InterviewSession>(`${BASE}/${id}/start/`),
  complete: (id: number) => client.post<InterviewSession>(`${BASE}/${id}/complete/`),
  getAnswers: (id: number) => client.get<Answer[]>(`${BASE}/${id}/answers/`),
};