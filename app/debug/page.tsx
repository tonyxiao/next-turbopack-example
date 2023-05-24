'use client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import React from 'react'

function PageContent() {
  const res = useQuery(['test'], () => ({ mynumber: Math.random() }), {
    staleTime: Number.POSITIVE_INFINITY,
  })
  ;(globalThis as any).res = res
  return (
    <div className="space-y-8">
      {res.status}
      <h1 className="text-xl font-medium text-gray-300">
        {res.data?.mynumber}
      </h1>
    </div>
  )
}

export default function Page() {
  const [slug, setSlug] = React.useState('')

  const queryClient = React.useMemo(() => {
    console.log('Creating new query client')
    return new QueryClient()
  }, [slug])

  ;(globalThis as any).queryClient = queryClient

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Hello {slug}</h1>
      Slug: <input value={slug} onChange={(e) => setSlug(e.target.value)} />
      <QueryClientProvider client={queryClient}>
        <PageContent />
      </QueryClientProvider>
    </div>
  )
}
