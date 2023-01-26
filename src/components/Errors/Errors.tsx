import React from 'react'
import * as s from './Errors.styled'

export const Errors = ({ errors }: { errors: string[] }) => {

  console.log(errors, 'errors');

  return (
    <s.errorContainer>
      {/* {errors.map((error, index) => (
        <s.error key={index}>{error}</s.error>
      ))} */}
    </s.errorContainer>
  )
}