export interface ProviderResponse {
  id: number;
  results: Results;
}

export interface Results {
  US: Us;
}

export interface Us {
  link: string;
  buy: Provider[];
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
