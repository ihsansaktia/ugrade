import { problemServiceValidator } from './validator'
import { ValidationError } from 'yup'
import { ProblemType } from '../problem'

describe('test problem service validator', () => {
  describe('test getContestProblems', () => {
    test.each([
      ['n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ', ''],
      ['zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6', '-zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6'],
      [
        'dQRjAQKKvmA3gAeHYzLpfCs84Vjs',
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6aisjd8',
      ],
      ['zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6', 'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuS'],
    ])('getContestProblems should fail', async (token, contestId) => {
      await expect(
        problemServiceValidator.getContestProblems(token, contestId)
      ).rejects.toBeInstanceOf(ValidationError)
    })

    test.each([
      ['n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ', 'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6'],
      ['zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6', 'mzAdQRjAQKKvmA3gAeHYzLpfCs84mzAV'],
    ])('getContestProblems should resolved', async (token, contestId) => {
      await expect(
        problemServiceValidator.getContestProblems(token, contestId)
      ).resolves.toBeDefined()
    })
  })

  describe('test getContestProblemById', () => {
    test.each([
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        '',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
      ],
      [
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        '-zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6',
      ],
      [
        'dQRjAQKKvmA3gAeHYzLpfCs84Vjs',
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6aisjd8',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
      ],
      [
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuS',
      ],
    ])(
      'getContestProblemById should fail',
      async (token, contestId, problemId) => {
        await expect(
          problemServiceValidator.getContestProblemById(
            token,
            contestId,
            problemId
          )
        ).rejects.toBeInstanceOf(ValidationError)
      }
    )

    test.each([
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6',
        'mzAdQRjAQKKvmA3gAeHYzLpfCs84mzAV',
      ],
      [
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'mzAdQRjAQKKvmA3gAeHYzLpfCs84mzAV',
      ],
    ])(
      'getContestProblemById should resolved',
      async (token, contestId, problemId) => {
        await expect(
          problemServiceValidator.getContestProblemById(
            token,
            contestId,
            problemId
          )
        ).resolves.toBeDefined()
      }
    )
  })

  describe('test createProblem', () => {
    test.each([
      [
        '-n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        '',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'a'.repeat(256),
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        '',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'a'.repeat(4 * 1024 + 1),
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        999,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        10001,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.09,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        10.1,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024 - 1,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        512 * 1024 * 1024 + 1,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        0.5,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        0,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        512 * 1024 * 1024 + 1,
      ],
    ])(
      'createProblem should fail',
      async (
        token,
        name,
        statement,
        type,
        disabled,
        timeLimit,
        tolerance,
        memoryLimit,
        outputLimit
      ) => {
        await expect(
          problemServiceValidator.createProblem(
            token as string,
            name as string,
            statement as string,
            type as ProblemType,
            disabled as boolean,
            timeLimit as number,
            tolerance as number,
            memoryLimit as number,
            outputLimit as number
          )
        ).rejects.toBeInstanceOf(ValidationError)
      }
    )

    test.each([
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'aaaa',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'a'.repeat(255),
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        's',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        's'.repeat(255),
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        10000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.1,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        10,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        512 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1000,
        0.2,
        16 * 1024 * 1024,
        512 * 1024 * 1024,
      ],
    ])(
      'createProblem should resolved',
      async (
        token,
        name,
        statement,
        type,
        disabled,
        timeLimit,
        tolerance,
        memoryLimit,
        outputLimit
      ) => {
        await expect(
          problemServiceValidator.createProblem(
            token as string,
            name as string,
            statement as string,
            type as ProblemType,
            disabled as boolean,
            timeLimit as number,
            tolerance as number,
            memoryLimit as number,
            outputLimit as number
          )
        ).resolves.toBeDefined()
      }
    )
  })

  describe('test updateProblem', () => {
    test.each([
      [
        '-n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        '-n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        '',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'a'.repeat(256),
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        '',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'a'.repeat(4 * 1024 + 1),
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1.2,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        999,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        10001,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.09,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        10.1,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024 - 1,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        512 * 1024 * 1024 + 1,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        0.5,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        0,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        512 * 1024 * 1024 + 1,
      ],
    ])(
      'updateProblem should fail',
      async (
        token,
        problemId,
        name,
        statement,
        type,
        disabled,
        order,
        timeLimit,
        tolerance,
        memoryLimit,
        outputLimit
      ) => {
        await expect(
          problemServiceValidator.updateProblem(
            token as string,
            problemId as string,
            name as string,
            statement as string,
            type as ProblemType,
            disabled as boolean,
            order as number,
            timeLimit as number,
            tolerance as number,
            memoryLimit as number,
            outputLimit as number
          )
        ).rejects.toBeInstanceOf(ValidationError)
      }
    )

    test.each([
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'aaaa',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'a'.repeat(255),
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        's',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        's'.repeat(255),
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        100000,
        1000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        10000,
        0.2,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.1,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        10,
        16 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        512 * 1024 * 1024,
        1,
      ],
      [
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ',
        'name',
        'statement',
        ProblemType.Batch,
        true,
        1,
        1000,
        0.2,
        16 * 1024 * 1024,
        512 * 1024 * 1024,
      ],
    ])(
      'updateProblem should resolved',
      async (
        token,
        problemId,
        name,
        statement,
        type,
        disabled,
        order,
        timeLimit,
        tolerance,
        memoryLimit,
        outputLimit
      ) => {
        await expect(
          problemServiceValidator.updateProblem(
            token as string,
            problemId as string,
            name as string,
            statement as string,
            type as ProblemType,
            disabled as boolean,
            order as number,
            timeLimit as number,
            tolerance as number,
            memoryLimit as number,
            outputLimit as number
          )
        ).resolves.toBeDefined()
      }
    )
  })

  describe('test deleteProblem', () => {
    test.each([
      ['n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ', ''],
      ['zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6', '-zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6'],
      [
        'dQRjAQKKvmA3gAeHYzLpfCs84Vjs',
        'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6aisjd8',
      ],
      ['zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6', 'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuS'],
    ])('deleteProblem should fail', async (token, problemId) => {
      await expect(
        problemServiceValidator.deleteProblem(token, problemId)
      ).rejects.toBeInstanceOf(ValidationError)
    })

    test.each([
      ['n7549xlQnLgYaLlWALYmrrpgEGkFDjWQ', 'zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6'],
      ['zjA2AJP8fuWCCQaQ2jw1zcZ9xmzAuSn6', 'mzAdQRjAQKKvmA3gAeHYzLpfCs84mzAV'],
    ])('deleteProblem should resolved', async (token, problemId) => {
      await expect(
        problemServiceValidator.deleteProblem(token, problemId)
      ).resolves.toBeDefined()
    })
  })
})
