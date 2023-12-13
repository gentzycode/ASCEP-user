interface SDGData {
  id: number;
  title: string;
  description: string;
  official_link: string;
  banner: string;
  sdgTarget: SdgTarget[];
}

interface SdgTarget {
  id: number;
  code: string;
  description: string;
  sdgs_id: number;
}
interface CategoryType {
  id: number;
  name: string;
  description: string;
  type: string;
}
interface WardsType {
  id: number;
  state: string;
  nig_code_2: string;
  longitude: number;
  latitude: number;
  lga: string;
  ward: string;
  ward_code: string;
}

interface CollectionData {
  id: number;
  name: string;
  description: string;
  type: string;
}
