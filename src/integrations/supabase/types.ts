export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      calorie_logs: {
        Row: {
          activity_type: string | null
          calories_burned: number
          created_at: string
          date: string
          id: string
          user_id: string
        }
        Insert: {
          activity_type?: string | null
          calories_burned?: number
          created_at?: string
          date?: string
          id?: string
          user_id: string
        }
        Update: {
          activity_type?: string | null
          calories_burned?: number
          created_at?: string
          date?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      check_ins: {
        Row: {
          available_time: number
          created_at: string
          energy_level: number
          id: string
          mood: string
          notes: string | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          available_time: number
          created_at?: string
          energy_level: number
          id?: string
          mood: string
          notes?: string | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          available_time?: number
          created_at?: string
          energy_level?: number
          id?: string
          mood?: string
          notes?: string | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: []
      }
      custom_records: {
        Row: {
          created_at: string
          date: string
          id: string
          notes: string | null
          record_type: string
          user_id: string
          value: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          record_type: string
          user_id: string
          value: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          record_type?: string
          user_id?: string
          value?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          id: string
          mood: string | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          mood?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          mood?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      menstrual_logs: {
        Row: {
          created_at: string
          date: string
          flow_intensity: string | null
          id: string
          notes: string | null
          symptoms: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          flow_intensity?: string | null
          id?: string
          notes?: string | null
          symptoms?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          flow_intensity?: string | null
          id?: string
          notes?: string | null
          symptoms?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          class_reminders: boolean | null
          created_at: string
          daily_reminder: boolean | null
          id: string
          motivational_quotes: boolean | null
          reminder_time: string | null
          updated_at: string
          user_id: string
          weekly_summary: boolean | null
        }
        Insert: {
          class_reminders?: boolean | null
          created_at?: string
          daily_reminder?: boolean | null
          id?: string
          motivational_quotes?: boolean | null
          reminder_time?: string | null
          updated_at?: string
          user_id: string
          weekly_summary?: boolean | null
        }
        Update: {
          class_reminders?: boolean | null
          created_at?: string
          daily_reminder?: boolean | null
          id?: string
          motivational_quotes?: boolean | null
          reminder_time?: string | null
          updated_at?: string
          user_id?: string
          weekly_summary?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity_level: string | null
          age_range: string | null
          created_at: string
          id: string
          name: string | null
          onboarding_completed: boolean | null
          phone: string | null
          preferred_activities: string[] | null
          purpose: string[] | null
          stress_triggers: string[] | null
          updated_at: string
          user_id: string
          wellness_goals: string[] | null
          workout_preference: string[] | null
        }
        Insert: {
          activity_level?: string | null
          age_range?: string | null
          created_at?: string
          id?: string
          name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferred_activities?: string[] | null
          purpose?: string[] | null
          stress_triggers?: string[] | null
          updated_at?: string
          user_id: string
          wellness_goals?: string[] | null
          workout_preference?: string[] | null
        }
        Update: {
          activity_level?: string | null
          age_range?: string | null
          created_at?: string
          id?: string
          name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferred_activities?: string[] | null
          purpose?: string[] | null
          stress_triggers?: string[] | null
          updated_at?: string
          user_id?: string
          wellness_goals?: string[] | null
          workout_preference?: string[] | null
        }
        Relationships: []
      }
      sleep_logs: {
        Row: {
          created_at: string
          date: string
          hours: number
          id: string
          notes: string | null
          quality: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          hours: number
          id?: string
          notes?: string | null
          quality?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          hours?: number
          id?: string
          notes?: string | null
          quality?: string | null
          user_id?: string
        }
        Relationships: []
      }
      step_logs: {
        Row: {
          created_at: string
          date: string
          id: string
          is_manual: boolean | null
          steps: number
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          is_manual?: boolean | null
          steps?: number
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_manual?: boolean | null
          steps?: number
          user_id?: string
        }
        Relationships: []
      }
      studio_bookings: {
        Row: {
          class_name: string
          class_type: string
          created_at: string
          duration: number
          id: string
          instructor: string | null
          scheduled_at: string
          status: string
          user_id: string
        }
        Insert: {
          class_name: string
          class_type: string
          created_at?: string
          duration?: number
          id?: string
          instructor?: string | null
          scheduled_at: string
          status?: string
          user_id: string
        }
        Update: {
          class_name?: string
          class_type?: string
          created_at?: string
          duration?: number
          id?: string
          instructor?: string | null
          scheduled_at?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
