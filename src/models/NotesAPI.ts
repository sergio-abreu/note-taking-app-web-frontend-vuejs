import type { Note, Reminder } from "@/models/Notes";
import axios from "axios";

export default class NotesApi {
  readonly url: string;
  readonly userID: string;

  constructor(url: string, userID: string) {
    this.url = url;
    this.userID = userID;
  }

  getNotes(): Promise<Array<Note>> {
    return axios.get([this.url, "api/v1", this.userID, "notes"].join("/"))
      .then(r => r.data)
      .catch((e: any) => {
        console.error(e);
      });
  }

  getInProgressNotes(): Promise<Array<Note>> {
    return axios.get([this.url, "api/v1", this.userID, "notes", "in-progress"].join("/"))
      .then(r => r.data)
      .catch((e: any) => {
        console.error(e);
      });
  }

  getCompletedNotes(): Promise<Array<Note>> {
    return axios.get([this.url, "api/v1", this.userID, "notes", "completed"].join("/"))
      .then(r => r.data)
      .catch((e: any) => {
        console.error(e);
      });
  }

  addNote(note: Note): Promise<Note> {
    return axios.post([this.url, "api/v1", this.userID, "notes"].join("/"), note)
      .then(r => ({
        id: r.data.note_id,
        title: note.title,
        description: note.description,
        completed: note.completed,
        user_id: this.userID,
        reminder: null,
        created_at: r.data.created_at,
        updated_at: r.data.updated_at
      }))
      .catch((e: any) => {
        console.error(e);
      });
  }

  copyNote(note: Note): Promise<Note> {
    return axios.post([this.url, "api/v1", this.userID, "notes", note.id, "copy"].join("/"))
      .then(r => {
        return {
          id: r.data.note_id,
          title: note.title,
          description: note.description,
          completed: note.completed,
          user_id: this.userID,
          reminder: null,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      })
      .catch((e: any) => {
        console.error(e);
      });
  }

  editNote(note: Note): Promise<Note> {
    return axios.patch([this.url, "api/v1", this.userID, "notes", note.id].join("/"), note)
      .then(r => {
        return {
          id: r.data.note_id,
          title: note.title,
          description: note.description,
          completed: note.completed,
          user_id: this.userID,
          reminder: note.reminder,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      })
      .catch((e: any) => {
        console.error(e);
      });
  }

  deleteNote(id: string): Promise<string> {
    return axios.delete([this.url, "api/v1", this.userID, "notes", id].join("/"))
      .catch((e: any) => {
        console.error(e);
      })
      .then(() => {
        return id;
      });
  }

  archiveNote(id: string): Promise<string> {
    return axios.put([this.url, "api/v1", this.userID, "notes", id, "complete"].join("/"))
      .catch((e: any) => {
        console.error(e);
      })
      .then(() => {
        return id;
      });
  }

  unarchiveNote(id: string): Promise<string> {
    return axios.put([this.url, "api/v1", this.userID, "notes", id, "in-progress"].join("/"))
      .catch((e: any) => {
        console.error(e);
      })
      .then(() => {
        return id;
      });
  }

  createReminder(noteID: string, reminder: Reminder): Promise<Reminder> {
    return axios.post([this.url, "api/v1", this.userID, "notes", noteID, "reminders"].join("/"), reminder)
      .then((r) => {
        return {
          id: r.data.reminder_id,
          note_id: noteID,
          user_id: this.userID,
          start_date: reminder.start_date,
          start_time: reminder.start_time,
          timezone: reminder.timezone,
          interval: reminder.interval,
          week_days: reminder.week_days,
          ends_after_n: reminder.ends_after_n,
          ends_at: reminder.ends_at,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      })
      .catch((e: any) => {
        console.error(e);
      });
  }

  editReminder(noteID: string, reminderID: string, reminder: Reminder): Promise<Reminder> {
    return axios.patch([this.url, "api/v1", this.userID, "notes", noteID, "reminders", reminderID].join("/"), reminder)
      .then((r) => {
        return {
          id: r.data.reminder_id,
          note_id: noteID,
          user_id: this.userID,
          start_date: reminder.start_date,
          start_time: reminder.start_time,
          timezone: reminder.timezone,
          interval: reminder.interval,
          week_days: reminder.week_days,
          ends_after_n: reminder.ends_after_n,
          ends_at: reminder.ends_at,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      })
      .catch((e: any) => {
        console.error(e);
      });
  }

  deleteReminder(noteID: string, reminderID: string): Promise<Reminder> {
    return axios.delete([this.url, "api/v1", this.userID, "notes", noteID, "reminders", reminderID].join("/"))
      .then(() => {
        return reminderID;
      })
      .catch((e: any) => {
        console.error(e);
      });
  }
}