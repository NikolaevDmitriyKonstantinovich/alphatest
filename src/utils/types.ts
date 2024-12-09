//-------------------------

export interface FluctuationData {
  start_rate: number;
  end_rate: number;
  change: number;
  change_pct: number;
}

export interface FixerApiFluctuationResponse {
  success: boolean;
  fluctuation: boolean;
  base: string;
  rates: {
    [key: string]: FluctuationData;
  };
}
