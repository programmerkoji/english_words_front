export type Word = {
  id: number;
  user_id: number;
  word_en: string;
  word_ja: string;
  part_of_speech: number;
  memory: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};