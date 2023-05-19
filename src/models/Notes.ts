export interface Reminder {
  id: string;
  cron_expression: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  user_id: string;
  reminder: Reminder;
  created_at: string;
  updated_at: string;
}