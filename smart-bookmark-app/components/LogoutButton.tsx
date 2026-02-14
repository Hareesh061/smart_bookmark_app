'use client'

import { supabase } from '@/lib/supabaseClient'

export default function LogoutButton() {
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <button
      onClick={logout}
      className="mb-4 text-sm text-red-500"
    >
      Logout
    </button>
  )
}
