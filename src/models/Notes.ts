export interface Reminder {
  id: string;
  note_id: string;
  user_id: string;
  start_date: Date;
  start_time: string;
  timezone: string;
  interval: string;
  week_days: string;
  ends_after_n: number;
  ends_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  user_id: string;
  reminder: Reminder;
  created_at: Date;
  updated_at: Date;
}
