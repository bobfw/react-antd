import type { ErrorComponentProps } from '@tanstack/react-router'
import { Result } from 'antd'

export const ErrorComponent = (props: ErrorComponentProps) => {
  const { error } = props
  if (error instanceof Error) {
    return <Result status="error" subTitle={error.message} title="Something went wrong" />
  }
  return error
}
