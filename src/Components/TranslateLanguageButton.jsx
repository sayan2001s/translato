import React from 'react'
import { languages } from '.'
export const TranslateLanguageButton = () => {
  return (
    <select>
      {languages.map((value, key) => {
        return (
          <option key={key} value={value.code}>{value.language}</option>
        )
      })}
    </select>
  )
}
