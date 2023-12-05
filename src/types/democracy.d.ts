interface ProposalType {
    title: string
    date: string
    content: string
    tags: string[]
    percentage: number
}
interface InitiativeType {
    user: string
    email: string
    title: string
    status: string
    content: string
    follower: number
    comments: number
    tags: string[]
    date: string
    signed: number
}
