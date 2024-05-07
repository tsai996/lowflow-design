export interface Field {
  id: string
  type: 'formItem' | 'container'
  label: string
  name: string
  value: any
  readonly?: boolean
  required?: boolean
  hidden: boolean
  props: Recordable
  children?: Field[]
}
