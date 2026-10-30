export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.18'
  }
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string
          gradient_end: string
          gradient_start: string
          icon: string
          id: string
          label: string
          profile_id: string
          scheduled_time: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          gradient_end: string
          gradient_start: string
          icon: string
          id?: string
          label: string
          profile_id: string
          scheduled_time: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          gradient_end?: string
          gradient_start?: string
          icon?: string
          id?: string
          label?: string
          profile_id?: string
          scheduled_time?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: 'activities_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      activity_completions: {
        Row: {
          activity_id: string
          completed_at: string
          completed_on: string
          id: string
          profile_id: string
        }
        Insert: {
          activity_id: string
          completed_at?: string
          completed_on?: string
          id?: string
          profile_id: string
        }
        Update: {
          activity_id?: string
          completed_at?: string
          completed_on?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'activity_completions_activity_id_fkey'
            columns: ['activity_id']
            isOneToOne: false
            referencedRelation: 'activities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activity_completions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      badges: {
        Row: {
          description: string
          icon: string
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          description: string
          icon: string
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          description?: string
          icon?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      breathing_sessions: {
        Row: {
          completed_at: string
          cycles: number
          duration_seconds: number
          id: string
          pattern: string
          profile_id: string
        }
        Insert: {
          completed_at?: string
          cycles?: number
          duration_seconds?: number
          id?: string
          pattern: string
          profile_id: string
        }
        Update: {
          completed_at?: string
          cycles?: number
          duration_seconds?: number
          id?: string
          pattern?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'breathing_sessions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      focus_sessions: {
        Row: {
          completed: boolean
          duration_seconds: number
          ended_at: string | null
          id: string
          profile_id: string
          started_at: string
          task_icon: string | null
          task_label: string | null
        }
        Insert: {
          completed?: boolean
          duration_seconds: number
          ended_at?: string | null
          id?: string
          profile_id: string
          started_at?: string
          task_icon?: string | null
          task_label?: string | null
        }
        Update: {
          completed?: boolean
          duration_seconds?: number
          ended_at?: string | null
          id?: string
          profile_id?: string
          started_at?: string
          task_icon?: string | null
          task_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'focus_sessions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      moods: {
        Row: {
          emoji: string
          id: string
          label: string
          logged_at: string
          note: string | null
          profile_id: string
        }
        Insert: {
          emoji: string
          id?: string
          label: string
          logged_at?: string
          note?: string | null
          profile_id: string
        }
        Update: {
          emoji?: string
          id?: string
          label?: string
          logged_at?: string
          note?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'moods_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          avatar_emoji: string
          created_at: string
          id: string
          name: string
          star_balance: number
          star_goal: number
          streak_days: number
        }
        Insert: {
          avatar_emoji?: string
          created_at?: string
          id?: string
          name: string
          star_balance?: number
          star_goal?: number
          streak_days?: number
        }
        Update: {
          avatar_emoji?: string
          created_at?: string
          id?: string
          name?: string
          star_balance?: number
          star_goal?: number
          streak_days?: number
        }
        Relationships: []
      }
      reward_redemptions: {
        Row: {
          cost_stars: number
          id: string
          profile_id: string
          redeemed_at: string
          reward_id: string
          status: string
        }
        Insert: {
          cost_stars: number
          id?: string
          profile_id: string
          redeemed_at?: string
          reward_id: string
          status?: string
        }
        Update: {
          cost_stars?: number
          id?: string
          profile_id?: string
          redeemed_at?: string
          reward_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reward_redemptions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reward_redemptions_reward_id_fkey'
            columns: ['reward_id']
            isOneToOne: false
            referencedRelation: 'rewards'
            referencedColumns: ['id']
          },
        ]
      }
      rewards: {
        Row: {
          cost_stars: number
          description: string
          icon: string
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          cost_stars: number
          description: string
          icon: string
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          cost_stars?: number
          description?: string
          icon?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          profile_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          profile_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_badges_badge_id_fkey'
            columns: ['badge_id']
            isOneToOne: false
            referencedRelation: 'badges'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_badges_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          profile_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          profile_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          profile_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'users_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
