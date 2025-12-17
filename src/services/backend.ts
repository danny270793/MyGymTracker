import type { AuthResponse } from '@supabase/supabase-js'
import { supabase } from './supabase'

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface Muscle {
  id: number
  name: string
  created_at: string
}

export interface Exercise {
  id: number
  name: string
  muscle_id: number
  created_at: string
}

/**
 * Maps Supabase error messages to i18n keys
 */
const mapLoginError = (message: string): string => {
  if (message === 'Invalid login credentials') {
    return 'invalidCredentials'
  }
  return message
}

/**
 * Maps Supabase register error messages to i18n keys
 */
const mapRegisterError = (message: string): string => {
  if (message.includes('already registered')) {
    return 'emailAlreadyRegistered'
  }
  if (message.includes('valid email')) {
    return 'emailInvalid'
  }
  if (message.includes('password')) {
    return 'passwordTooWeak'
  }
  return message
}

export const backend = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response: AuthResponse = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (response.error) {
      throw new Error(mapLoginError(response.error.message))
    }

    if (!response.data.session) {
      throw new Error('invalidCredentials')
    }

    return {
      accessToken: response.data.session.access_token,
      refreshToken: response.data.session.refresh_token,
      tokenType: response.data.session.token_type,
    }
  },

  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  },

  register: async (email: string, password: string): Promise<void> => {
    const response: AuthResponse = await supabase.auth.signUp({
      email,
      password,
    })

    if (response.error) {
      throw new Error(mapRegisterError(response.error.message))
    }
  },

  getMuscles: async (): Promise<Muscle[]> => {
    const { data, error } = await supabase.from('Muscles').select('*')

    if (error) {
      throw new Error(error.message)
    }

    return data as Muscle[]
  },

  createMuscle: async (name: string): Promise<Muscle> => {
    const { data, error } = await supabase
      .from('Muscles')
      .insert({ name })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data as Muscle
  },

  updateMuscle: async (id: number, name: string): Promise<Muscle> => {
    const { data, error } = await supabase
      .from('Muscles')
      .update({ name })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data as Muscle
  },

  deleteMuscle: async (id: number): Promise<void> => {
    const { error } = await supabase.from('Muscles').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  },

  getExercisesByMuscle: async (muscleId: number): Promise<Exercise[]> => {
    const { data, error } = await supabase
      .from('Exercises')
      .select('*')
      .eq('muscle_id', muscleId)

    if (error) {
      throw new Error(error.message)
    }

    return data as Exercise[]
  },

  createExercise: async (name: string, muscleId: number): Promise<Exercise> => {
    const { data, error } = await supabase
      .from('Exercises')
      .insert({ name, muscle_id: muscleId })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data as Exercise
  },
}

