export type TShow = {
    id: number;
    name: string;
    averageRuntime: number;
    image: {
      medium: string;
      original: string;
    }
    network: {
      name: string;
      country: {
        name: string;
        code: string;
        timezone: string;
      }
    }
    rating: { average: number };
    schedule: { time: string; days: string[] };
    summary: string;
    url: string;
    premiered: string;
    runtime: number;
    language: string;
    genres: string[];
}

export type TShowSearch = {
  score: number;
  show: TShow;
}
