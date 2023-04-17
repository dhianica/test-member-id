'use client'
import { useEffect, useState } from 'react';
import '../../../styles/globals.scss'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <main>
      {children}
    </main>
  )
}
