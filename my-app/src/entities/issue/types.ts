import type { CategoryKey } from "@/shared/config";

export interface Issue {
  id: string;
  title: string;
  summary_1: string;
  summary_2: string;
  summary_3: string;
  category: CategoryKey;
  source_url: string;
  source_name: string;
  published_at: string;
  created_at: string;
}

export type IssueInsert = Omit<Issue, "id" | "created_at">;

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: "13";
  };
  public: {
    Tables: {
      issues: {
        Row: Issue;
        Insert: IssueInsert;
        Update: Partial<IssueInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
