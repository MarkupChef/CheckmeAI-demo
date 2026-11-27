import api from '@store/api/api';
import { QuestionAnswers } from '@store/api/models/Answers.type';
import {
  CheckJobDesc,
  GetQuestions,
  GetQuestionsByJobDesc,
  Question,
  Questions,
} from '@store/api/models/Questions.type';
import { setAnswers, setQuestions } from '@store/questionsSlice';

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    startInterview: builder.query<any, string>({
      query(mode_id) {
        return {
          method: 'POST',
          url: '/interview',
          body: { mode_id },
        };
      },
    }),
    getQuestions: builder.query<Questions, GetQuestions>({
      query({ topic, level, mode_id }) {
        return {
          method: 'GET',
          url: `/questions`,
          params: {
            topic,
            level,
            mode_id,
          },
        };
      },
      keepUnusedDataFor: 5,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(
            setQuestions({
              questions: data.questions,
              lastIndexWithAnswer: data.lastIndexWithAnswer,
            })
          );
        } catch (error) {
          console.error('Error of getting questions', error);
        }
      },
    }),

    getQuestionsByJobDescription: builder.query<Questions, GetQuestionsByJobDesc>({
      query({ jobTitle, jobDesc, mode_id }) {
        return {
          method: 'POST',
          url: `/questionsByJobDesc`,
          body: {
            jobTitle,
            jobDesc,
            mode_id,
          },
        };
      },
      keepUnusedDataFor: 5,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(
            setQuestions({
              questions: data.questions,
              lastIndexWithAnswer: data.lastIndexWithAnswer,
            })
          );
        } catch (error) {
          console.error('Error of getting questions', error);
        }
      },
    }),

    checkIsJobDescValid: builder.query<boolean, CheckJobDesc>({
      query({ jobTitle, companyName, jobDesc, modeId }) {
        return {
          method: 'POST',
          url: `/checkJobDesc`,
          body: {
            jobTitle,
            companyName,
            jobDesc,
            modeId,
          },
        };
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error of checking job desc:', error);
        }
      },
    }),

    getAnswers: builder.query<QuestionAnswers, { topic: string; question: string }>({
      query({ topic, question }) {
        return {
          method: 'GET',
          url: `/answers`,
          params: {
            topic,
            question,
          },
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setAnswers({
              date: data.date,
              index: data.index,
              options: data.options,
            })
          );
        } catch (error) {
          console.error('Error of getting answers', error);
        }
      },
    }),

    getAnswerOptions: builder.query<QuestionAnswers, { question: string }>({
      query({ question }) {
        return {
          method: 'GET',
          url: `/answerOptions`,
          params: {
            question,
          },
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setAnswers({
              date: data.date,
              index: data.index,
              options: data.options,
            })
          );
        } catch (error) {
          console.error('Error of getting answers', error);
        }
      },
    }),

    saveInterview: builder.mutation<string, { topic_slug: string; level: string; questions: Question[]; mode: string }>(
      {
        query({ topic_slug, level, questions, mode }) {
          return {
            method: 'POST',
            url: '/interviews',
            body: {
              topic_slug,
              level,
              questions,
              mode,
            },
          };
        },
        async onQueryStarted(args, { queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (error) {
            console.error('Error of saving interview', error);
          }
        },
      }
    ),

    saveInterviewByJobDesc: builder.mutation<
      string,
      { jobTitle: string; companyName: string; jobDesc: string; questions: Question[]; mode: string }
    >({
      query({ jobTitle, companyName, jobDesc, questions, mode }) {
        return {
          method: 'POST',
          url: '/interviewsByJobDesc',
          body: {
            jobTitle,
            companyName,
            jobDesc,
            questions,
            mode,
          },
        };
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error of saving interview by job desc', error);
        }
      },
    }),
  }),
});

export const {
  useLazyStartInterviewQuery,
  useLazyGetQuestionsQuery,
  useLazyGetAnswersQuery,
  useSaveInterviewMutation,
  useSaveInterviewByJobDescMutation,
  useLazyGetQuestionsByJobDescriptionQuery,
  useLazyGetAnswerOptionsQuery,
  useLazyCheckIsJobDescValidQuery,
} = extendedApiSlice;
