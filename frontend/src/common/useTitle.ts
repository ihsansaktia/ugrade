import { useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'

import { setTitle } from 'ugrade/stores/Title'

export function useTitle(title: string) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTitle(title))
  })
}