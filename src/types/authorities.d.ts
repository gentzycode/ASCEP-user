interface AuthorityType {
  name: string;
  description: string;
  contact_info: string;
  id: string;
  total_request_cache: number;
}

interface AuthorityDataType {
  information: AuthorityInfoType;
  moderators: any[];
}

interface AuthorityInfoType {
  id: string;
  name: string;
  description: string;
  contact_info: string;
  active: boolean;
  updatedAt: string;
  createdAt: string;
  total_request_cache: number;
}

interface RequestDataType {
  meta: MetaDataType;
  foi_requests: RequestType[];
}

interface RequestAuthorityCountType {
  totalAuthorities: string;
  totalRequests: string;
}
interface RequestType {
  id: string;
  user_id: string;
  authority_id: string;
  public_body_id: string;
  title: string;
  description: string;
  request_date: string;
  status: string;
  public_identifier: string;
  updatedAt: string;
  createdAt: string;
  shareable_id: string;
  author: AuthorType;
  authority: {
    name: string;
    id: string;
  };
}
interface AuthorType {
  id: string;
  username: string;
  profile_picture: string;
}
interface MetaDataType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  previous_page_url: string | null;
}

interface RequestResponseDataType {
  meta: MetaDataType;
  responses: RequestResponseType[];
}

interface RequestResponseType {
  id: string;
  responder_id: string;
  authority_id: string;
  request_id: string;
  response_text: string;
  response_date: string;
  is_public: boolean;
  updatedAt: string;
  createdAt: string;
  is_user_response: boolean;
  is_moderator_response: boolean;
  attachments: any[];
  authority: {
    name: string;
    id: string;
  };
  user: {
    firstname: string;
    lastname: string;
    profile_picture: string;
    username: string;
    id: string;
  };
}
