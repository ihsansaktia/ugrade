import { Formik, FormikActions } from 'formik'
import React, { FunctionComponent } from 'react'
import { usePublicOnly } from 'ugrade/auth'
import { handleCommonError } from 'ugrade/common'
import { TopToaster } from 'ugrade/common/ActionToaster'
import { useCreateContest } from 'ugrade/contest'
import * as yup from 'yup'
import { CreateContestFormView } from './CreateContestFormView'

export interface CreateContestFormValue {
  email: string
  contestShortId: string
  contestName: string
  contestShortDescription: string
}

export const CreateContestForm: FunctionComponent = () => {
  usePublicOnly()

  const initialValue: CreateContestFormValue = {
    email: '',
    contestShortId: '',
    contestName: '',
    contestShortDescription: '',
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .min(4)
      .max(255)
      .email()
      .required(),
    contestShortId: yup
      .string()
      .min(4)
      .max(255)
      .label('Contest ID')
      .matches(
        /[a-zA-Z0-9\-]+/,
        'Contest ID contains alphanumeric and dash character only'
      )
      .required(),
    contestName: yup
      .string()
      .max(255)
      .label('Contest Name')
      .required(),
    contestShortDescription: yup
      .string()
      .max(255)
      .label('Short Description'),
  })

  const createContest = useCreateContest()

  const handleSubmit = async (
    values: CreateContestFormValue,
    { setSubmitting }: FormikActions<CreateContestFormValue>
  ) => {
    try {
      await createContest(
        values.email,
        values.contestShortId,
        values.contestName,
        values.contestShortDescription
      )
      TopToaster.showSuccessToast('Contest Created')
    } catch (error) {
      if (!handleCommonError(error)) throw error
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      component={CreateContestFormView}
    />
  )
}
