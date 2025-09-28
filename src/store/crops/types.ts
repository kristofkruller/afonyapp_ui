export interface Crop {
  id: number;
  take_open_start?: string;
  take_open_end?: string;
  available_note: string;
  location: string;
  start_amount: number;
  available_amount: number;
}

export interface CropsSuccessResponse {
  crops: Crop[];
  token: string;
}