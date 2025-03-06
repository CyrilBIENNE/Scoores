import { ucFirst } from '@/utils/format/formatString'

type optionsProps = {
  day?: string
  month?: string
  year?: string
  week?: string
}

export function formatDate(date?: any, options?: any) {
  if (!date) date = new Date()
  if (!options) options = { year: 'numeric', month: 'long', day: 'numeric' }
  return ucFirst(date.toLocaleDateString('fr-FR', options))
}

export function formatDateHR(hrOptions?: any, date?: any) {
  if (!date) date = new Date()
  let options: optionsProps = {}

  if (hrOptions && hrOptions != '') {
    if (hrOptions.search('DDDD') != -1) options.day = 'numeric'
    if (hrOptions.search('MMMM') != -1) options.month = 'long'
    if (hrOptions.search('YYYY') != -1) options.year = 'numeric'
  } else {
    options = { year: 'numeric', month: 'long', day: 'numeric' }
  }
  return ucFirst(date.toLocaleDateString('fr-FR', options))
}

export function formatDateHour(datetime?: any, prefix: string = 'Le', noYear?: boolean) {
  const date = new Date(datetime)
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: noYear ? undefined : 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const formattedDate = formatter.format(date)
  const formattedPhrase = prefix + ' ' + formattedDate.replace(' ', ' à ').replace(':', 'h')

  return formattedPhrase
}

export function formatDatetime(datetime?: any) {
  const formatter = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return formatter.format(new Date(datetime))
}

export function formatHour(datetime?: any) {
  const date = new Date(datetime)
  const formatter = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' })

  return formatter.format(date).replace(':', 'h')
}
