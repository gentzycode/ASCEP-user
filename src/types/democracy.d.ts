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
interface SdgOptionsType {
    image: string;
    id: number;
    value: number;
}

interface FilterButtonOptionsType {
    label: string;
    value: string;
}



// DEBATES
interface DebateAuthorType {
    id: number
    username: string
    profile_picture: string | null
}
interface DebateTagType {
    id: number
    tag_name: string
    debate_id: number
}
interface DebateTargetType {
    target_id: number
    debate_id: number
    targetInfo: {
        code: string
        id: number
    }
}


interface DebateDataType {
    status: string
    message: string
    data: DebateType[]
}
interface DebateType {
    id: number
    title: string
    description: string
    shareable_id: string
    user_id: string
    total_comments_cache: number
    total_votes_cache: number
    inapproriate_flag: boolean
    createdAt: string
    debateTag: DebateTagType[]
    author: DebateAuthorType
    debateTarget: DebateTargetType[]
    likes: number
    dislikes: number
    likePercentage: number
    dislikePercentage: number
    userVoted: boolean
}

//SDGs
interface SDGTarget {
    id: number
    code: string
    description: string
    sdgs_id: number

}
interface SDGType {
    status: string
    message: string
    data: SDGsType[]
}
interface SDGsType {
    id: string
    title: string
    description: string
    official_link: string
    banner: string
    sdgTarget: SDGTarget[]
}


type RequestStatustType = "error" | "idle" | "loading" | "success"

