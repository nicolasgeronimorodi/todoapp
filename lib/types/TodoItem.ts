export interface TodoItem {
  _id: string
  name: string
  message: string
  done?: boolean
  scheduledDate: Date
}
