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

interface SelectOption {
  value: string;
  label: string;
}

interface CollectionData {
  id: number;
  name: string;
  description: string;
  type: string;
}
