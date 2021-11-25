export interface Transaction {
    id?: string
    date: string
    amount: number | null
    description: string
    type: string
}
