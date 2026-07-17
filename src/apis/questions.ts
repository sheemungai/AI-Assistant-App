import type { CreateQuestionPayload, CreateSampleAnswerPayload, GenerateQuestionPayload, Question, SampleAnswer } from '../types';
import { client } from './client';


const QUESTIONS_BASE = '/questions/questions';
const ANSWERS_BASE = '/questions/sample-answers';
const GENERATE_URL = '/questions/generate';


export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'behavioral' | 'technical' | 'situational';
export const questionsApi = {
    
  list: () => client.get<Question[]>(`${QUESTIONS_BASE}/`),
  get: (id: number) => client.get<Question>(`${QUESTIONS_BASE}/${id}/`),
  create: (data: CreateQuestionPayload) =>
    client.post<Question>(`${QUESTIONS_BASE}/`, data),
  update: (id: number, data: Partial<CreateQuestionPayload>) =>
    client.patch<Question>(`${QUESTIONS_BASE}/${id}/`, data),
  delete: (id: number) => client.delete<void>(`${QUESTIONS_BASE}/${id}/`),
   generate: (data: GenerateQuestionPayload) =>
    client.post<Question>(`${GENERATE_URL}/`, data),
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