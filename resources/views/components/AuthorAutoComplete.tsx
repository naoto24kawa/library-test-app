/** @jsx jsx */
import React from 'react'
import { css, jsx, SerializedStyles } from '@emotion/react'
import {
  Autocomplete,
  AutocompleteProps,
  createFilterOptions,
  TextField,
  TextFieldVariants,
  UseAutocompleteProps,
} from '@mui/material'
import classnames from 'classnames'

export type AuthorAutoCompleteProps = {
  authors: Author[]
  value?: AuthorAutoCompleteOptionType
  className?: string | string[] | object
  style?: SerializedStyles
  label?: string
  variant?: TextFieldVariants
  onChange: (newValue: AuthorAutoCompleteOptionType | null) => void
  disabled?: boolean
}

export type AuthorAutoCompleteOptionType = {
  inputValue?: string
  label?: string
  name?: string
  id?: number
}

const defaultStyles = css({
  border: '0px',
})

export const AuthorAutoComplete: React.FunctionComponent<
  AuthorAutoCompleteProps
> = ({
  authors,
  value,
  className,
  style,
  label = 'Author',
  variant = 'filled',
  onChange,
  disabled = false,
}) => {
  const filter = createFilterOptions<AuthorAutoCompleteOptionType>()
  const options: readonly AuthorAutoCompleteOptionType[] = authors.map(
    (author) =>
      ({
        ...author,
        inputValue: author.name,
      }) as AuthorAutoCompleteOptionType
  )

  const handleChange: UseAutocompleteProps<
    AuthorAutoCompleteOptionType,
    false,
    false,
    false
  >['onChange'] = (event, newValue) => {
    onChange(newValue)
  }

  const filterOptions: UseAutocompleteProps<
    AuthorAutoCompleteOptionType,
    false,
    false,
    false
  >['filterOptions'] = (options, params) => {
    const filtered = filter(options, params)
    const { inputValue } = params
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.name)
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        name: inputValue,
      })
    }
    return filtered
  }

  const getOptionLabel: UseAutocompleteProps<
    AuthorAutoCompleteOptionType,
    false,
    false,
    false
  >['getOptionLabel'] = (option) => {
    if (typeof option === 'string') {
      return option
    }
    if (option.inputValue) {
      return option.inputValue
    }
    return option.name ?? ''
  }

  const renderOption: AutocompleteProps<
    AuthorAutoCompleteOptionType,
    false,
    false,
    false,
    'div'
  >['renderOption'] = (props, option) => <li {...props}>{option.name}</li>

  return (
    <Autocomplete
      value={value}
      className={classnames(className)}
      css={{ ...defaultStyles, ...style }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      onChange={handleChange}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField {...params} label={label} variant={variant} />
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disabled={disabled}
    />
  )
}
