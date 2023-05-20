import type { Note, Reminder } from "@/models/Notes";
import axios from "axios";

export default class NotesApi {
  readonly url: string;
  readonly userID: string;

  constructor(url: string, userID: string) {
    this.url = url;
    this.userID = userID;
  }

  getInProgressNotes(): Promise<Array<Note>> {
    return axios.get([this.url, "api/v1", this.userID, "notes/"].join("/"))
      .then(r => r.data);
  }

  getCompletedNotes(): Promise<Array<Note>> {
    return axios.get([this.url, "api/v1", this.userID, "notes", "completed"].join("/"))
      .then(r => r.data);
  }

  addNote(note: Note): Promise<Note> {
    const title = note.title;
    const description = note.description;
    return axios.post([this.url, "api/v1", this.userID, "notes/"].join("/"), note)
      .then(r => ({
        id: r.data.note_id,
        title: title,
        description: description,
        user_id: this.userID,
        reminder: null,
        created_at: r.data.created_at,
        updated_at: r.data.updated_at
      }));
  }

  copyNote(note: Note): Promise<Note> {
    return axios.post([this.url, "api/v1", this.userID, "notes", note.id, "copy"].join("/"))
      .then(r => {
        return {
          id: r.data.note_id,
          title: note.title,
          description: note.description,
          user_id: this.userID,
          reminder: null,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      });
  }

  editNote(note: Note): Promise<Note> {
    return axios.patch([this.url, "api/v1", this.userID, "notes", note.id].join("/"), note)
      .then(r => {
        return {
          id: r.data.note_id,
          title: note.title,
          description: note.description,
          user_id: this.userID,
          reminder: null,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      });
  }

  deleteNote(id: string): Promise<string> {
    return axios.delete([this.url, "api/v1", this.userID, "notes", id].join("/"))
      .then(() => {
        return id;
      });
  }

  archiveNote(id: string): Promise<string> {
    return axios.put([this.url, "api/v1", this.userID, "notes", id, "complete"].join("/"))
      .then(() => {
        return id;
      });
  }

  unarchiveNote(id: string): Promise<string> {
    return axios.put([this.url, "api/v1", this.userID, "notes", id, "in-progress"].join("/"))
      .then(() => {
        return id;
      });
  }

  createReminder(noteID: string, reminder: Reminder): Promise<Reminder> {
    return axios.post([this.url, "api/v1", this.userID, "notes", noteID, "reminders"].join("/"), reminder)
      .then((r) => {
        return {
          id: r.data.reminder_id,
          cron_expression: reminder.cron_expression,
          ends_at: reminder.ends_at,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      });
  }

  editReminder(noteID: string, reminderID:string, reminder: Reminder): Promise<Reminder> {
    return axios.patch([this.url, "api/v1", this.userID, "notes", noteID, "reminders", reminderID].join("/"), reminder)
      .then((r) => {
        return {
          id: r.data.reminder_id,
          cron_expression: reminder.cron_expression,
          ends_at: reminder.ends_at,
          created_at: r.data.created_at,
          updated_at: r.data.updated_at
        };
      });
  }

  deleteReminder(noteID: string, reminderID: string): Promise<Reminder> {
    return axios.delete([this.url, "api/v1", this.userID, "notes", noteID, "reminders", reminderID].join("/"))
      .then(() => {
        return reminderID;
      });
  }
}