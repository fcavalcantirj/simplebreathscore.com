export interface Session {
  id: string
  date: string
  duration: number
  breathCount: number
  score: number
  inhaleTimestamps: number[]
  exhaleTimestamps: number[]
}
