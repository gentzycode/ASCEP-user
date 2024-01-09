/* eslint-disable @typescript-eslint/no-explicit-any */

interface ReportResponse {
  status: string;
  message: string;
  reports: ReportData;
}
interface ReportData {
  id: number;
  user_id: number;
  title: string;
  description: string;
  submission_date: any;
  status_id: any;
  report_type: string;
  updatedAt: string;
  createdAt: string;
  longitude: number;
  latitude: number;
  location_meta: string;
  total_comments_cache: number;
  reportSDGs: ReportSdg[];
  reportCategory: ReportCategory;
  reporter: Reporter;
  reportImages: ReportImage[];
  reportStatus: ReportStatus;
}

interface ReportSdg {
  sdg_id: number;
  report_id: number;
  sdg: Sdg;
}

interface Sdg {
  title: string;
  banner: string;
  id: number;
}

interface ReportCategory {
  category_id: number;
  report_id: number;
  categoryDetail: CategoryDetail;
}

interface CategoryDetail {
  name: string;
  id: number;
}

interface Reporter {
  username: string;
  firstname: any;
  lastname: any;
  profile_picture: any;
  id: number;
}

interface ReportImage {
  image_url: string;
  report_id: number;
}

interface ReportStatus {
  name: string;
  slug: string;
  description: string;
  id: number;
}

// ACTIVITIES
interface ActivityResponse {
  meta: MetaDataType;
  data: ActivityData[];
}
interface ActivityData {
  report_id: number;
  action: "CREATE" | "READ" | "DELETE" | "DELETE-COMMENT" | "COMMENT";
  ref_user: number;
  refUser: RefUser;
  report: ActivityReport;
}

interface RefUser {
  firstname: string;
  lastname: string;
  profile_picture: string;
  id: number;
}

interface ActivityReport {
  title: string;
  user_id: number;
  id: number;
}

// RESPONSE COMMENTS

interface ReportCommentsResponse {
  meta: MetaDataType;
  comments: ReportComment[];
}

interface ReportComment {
  content: string;
  id: number;
  user_id: number;
  comment_vote_cache: number;
  comment_response_cache: number;
  createdAt: string;
  author: Author;
}

interface Author {
  username: string;
  profile_picture: string;
  id: number;
}
