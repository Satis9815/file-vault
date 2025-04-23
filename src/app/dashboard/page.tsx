import Dashboard from '@/components/custom-ui/dashboard'
import React, { Suspense } from 'react'

const DashboardPage = () => {
  return (
    <>
    <Suspense fallback={<div>Loading</div>}>
      <Dashboard/>
    </Suspense>
      
    </>
  )
}

export default DashboardPage
