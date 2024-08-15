export interface MongoDBItem {
  _id: string;
  id: string;
  title: string;
  category: {
    main: string;
    sub: string;
  };
  designers: string[];
  price: {
    current: number;
    updated_at: string;
  };
  color: string;
  size: string;
  image: {
    url: string;
    width: number | null;
    height: number | null;
  };
  created_at: string;
  department: string;
  processed_at: string;
  similarity_score?: number;
}
