import type { CreateQuestionPayload, CreateSampleAnswerPayload, Question, SampleAnswer } from '#/types';
import { client } from './client';


const QUESTIONS_BASE = '/questions/questions';
const ANSWERS_BASE = '/questions/sample-answers';


export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'behavioral' | 'technical' | 'situational';
export type Role = 'software_developer' | 'sales_manager' | 'product_manager';
export const questionsApi = {
    
  list: () => client.get<Question[]>(`${QUESTIONS_BASE}/`),
  get: (id: number) => client.get<Question>(`${QUESTIONS_BASE}/${id}/`),
  create: (data: CreateQuestionPayload) =>
    client.post<Question>(`${QUESTIONS_BASE}/`, data),
  update: (id: number, data: Partial<CreateQuestionPayload>) =>
    client.patch<Question>(`${QUESTIONS_BASE}/${id}/`, data),
  delete: (id: number) => client.delete<void>(`${QUESTIONS_BASE}/${id}/`),
};

export const sampleAnswersApi = {
  list: () => client.get<SampleAnswer[]>(`${ANSWERS_BASE}/`),
  get: (id: number) => client.get<SampleAnswer>(`${ANSWERS_BASE}/${id}/`),
  create: (data: CreateSampleAnswerPayload) =>
    client.post<SampleAnswer>(`${ANSWERS_BASE}/`, data),
  update: (id: number, data: Partial<CreateSampleAnswerPayload>) =>
    client.patch<SampleAnswer>(`${ANSWERS_BASE}/${id}/`, data),
  delete: (id: number) => client.delete<void>(`${ANSWERS_BASE}/${id}/`),
};