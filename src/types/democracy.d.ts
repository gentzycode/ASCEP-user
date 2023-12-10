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
interface DebateSDGsType {
    sdgs_id: number
    debate_id: number
    sdgs: {
        banner: string
        id: number
        title: string
    }
}

interface DebateMetaDataType {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: string | null
    last_page_url: string | null
    next_page_url: string | null
    previous_page_url: string | null
}
interface DebateDataType {
    meta: DebateMetaDataType
    debates: DebateType[]
}


interface DebateCommentResponseType {
    response_id: number
    comment_id: number
    commentDetail: {
        content
        id: number
        user_id: number
        user: DebateAuthorType
        responses: DebateCommentResponseType[]
    }
}

interface DebateCommentType {
    content: string
    id: number
    user_id: number
    author: DebateAuthorType
    responses: DebateCommentResponseType[]
    likes: number
    dislikes: number
    likePercentage: number
    dislikePercentage: number
    userVoted: boolean
    createdAt: string
}
interface DebateType {
    id: number
    title: string
    description: string
    shareable_id: string
    user_id: number
    total_comments_cache: number
    total_votes_cache: number
    inapproriate_flag: boolean
    createdAt: string
    debateTag: DebateTagType[]
    author: DebateAuthorType
    debateTarget: DebateTargetType[]
    debateSDGs: DebateSDGsType[]
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
    id: number
    title: string
    description: string
    official_link: string
    banner: string
    sdgTarget: SDGTarget[]
}



type RequestStatustType = "error" | "idle" | "loading" | "success"

interface ResponseDataType {
    status: string;
    message: string;
    data?: any;
};