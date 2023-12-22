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
    firstname?: string
    lastname?: string
}
interface DebateTagType {
    id: number
    tag_name: string
    debate_id: number
}
interface TargetType {
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

interface MetaDataType {
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
    meta: MetaDataType
    debates: DebateType[]
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
    debateTarget: TargetType[]
    debateSDGs: DebateSDGsType[]
    likes: number
    dislikes: number
    likePercentage: number
    dislikePercentage: number
    userVoted: {
        reaction: boolean
        reactionType: string
    }
}

interface CommentResponseType {
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


//vote debate
interface DebateVoteDataType {
    status: string
    message: string
    data: {

        total: number
        type: string
    }
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

// PROPOSALS
interface ProposalDataType {
    meta: MetaDataType
    proposals: ProposalType[]
}
interface ProposalType {
    id: number
    user_id: number
    title: string
    content: string
    status: string
    updatedAt: string
    createdAt: string
    summary: string
    descriptive_image: string
    support_needed: number
    ward_id: number
    external_video_url: string
    total_support_cache: number
    total_comments_cache: number
    proposalTag: ProposalTagType[]
    proposalCategory: ProposalCategoryType[]
    proposalTarget: TargetType[]
    proposalSDGs: ProposalSDGType[]
    author: ProposalAuthorType
    supportGotten: number
    supportNeeded: number
    supportPercentage: number
    userSupported: boolean
    proposal_code: string
    proposalDocuments: {
        document_url: string
        proposal_id: number
    }[]
}

interface ProposalAuthorType {
    id: number
    username: string
    profile_picture: string
}
interface ProposalSDGType {
    sdgs_id: number
    proposal_id: number
    sdgs: {
        title: string
        banner: string
        id: number
    }
}
interface ProposalCategoryType {
    category_id: number
    proposal_id: number
    categoryDetail: {
        name: string
        id: number
    }
}
interface ProposalTagType {
    id: number
    tag_name: string
    proposal_id: number
}

// PROPOSAL TOPICS
interface ProposalTopicDataType {
    meta: MetaDataType
    data: ProposalTopicType[]
}

interface ProposalTopicType {
    id: number
    proposal_id: number
    user_id: number
    title: string
    content: string
    total_vote_cache: number
    total_comment_cache: number
    updated_at: string
    created_at: string
    creator: {
        firstname: string
        lastname: string
        username: string
        profile_picture: string
        id: number
    }
    proposal: {
        title: string
        user_id: number
        id: number
    }
}
interface ProposalCommunityMemberType {
    user_id: number
    creator: {
        profile_picture: string
        firstname: string
        lastname: string
        id: number
    }
}


//COMMENT
interface CommentDataType {
    meta: CommentMetaDataType
    comments: CommentType[]
}
interface CommentMetaDataType {
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
interface CommentType {
    content: string
    id: number
    user_id: number
    author: DebateAuthorType
    responses: DebateCommentResponseType[]
    likes: number
    dislikes: number
    likePercentage: number
    dislikePercentage: number
    userVoted: {
        reaction: boolean
        reactionType: string
    }
    createdAt: string
}