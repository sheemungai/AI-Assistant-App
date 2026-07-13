import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { answerSubmissionApi } from '@/apis/interviews'
import type { Answer, Question } from '../types'

interface AnswerFormProps {
  sessionId: number
  question: Question
  existingAnswer?: Answer   
}

export function AnswerForm({ sessionId, question, existingAnswer }: AnswerFormProps) {
  const [responseText, setResponseText] = useState(existingAnswer?.response_text ?? '')
  const queryClient = useQueryClient()

  const submitMutation = useMutation({
    mutationFn: () =>
      answerSubmissionApi.create({
        session: sessionId,
        question: question.id,
        response_text: responseText,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session', sessionId] })
    },
  })

  const isSubmitted = !!existingAnswer

  return (
    <div className="border rounded p-4">
      <h3 className="font-medium mb-2">{question.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{question.description}</p>

      <textarea
        className="border rounded p-2 w-full text-sm"
        rows={4}
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        disabled={isSubmitted}
        placeholder="Type your answer..."
      />

      {!isSubmitted && (
        <button
          onClick={() => submitMutation.mutate()}
          disabled={submitMutation.isPending || !responseText.trim()}
          className="mt-2 bg-blue-600 text-white rounded px-4 py-2 text-sm disabled:opacity-50"
        >
          {submitMutation.isPending ? 'Submitting...' : 'Submit Answer'}
        </button>
      )}

      {isSubmitted && (
        <div className="mt-3 border-t pt-3">
          {!existingAnswer.is_evaluated ? (
            <p className="text-sm text-gray-500">Evaluating your answer...</p>
          ) : (
            <div className="text-sm">
              <p className="font-medium">Score: {existingAnswer.ai_score}/10</p>
              <p className="text-gray-600 mt-1">{existingAnswer.ai_feedback}</p>
              {existingAnswer.ai_strengths.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-green-700">Strengths</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {existingAnswer.ai_strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {existingAnswer.ai_improvements.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-amber-700">Improvements</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {existingAnswer.ai_improvements.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}