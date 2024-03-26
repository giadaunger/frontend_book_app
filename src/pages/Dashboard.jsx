import React from 'react'
import ReadingBooks from '../components/ReadingBooks'
import DashboardStatistics from '../components/DashboardStatistics'
import DashboardRecommendation from '../components/DashboardRecommendation'

function Dashboard() {
  return (
    <div>
      <div className="mb-16">
        <ReadingBooks />
      </div>
      <div className="mb-16">
        <DashboardStatistics />
      </div>
      <div>
        <DashboardRecommendation />
      </div>
    </div>
  )
}

export default Dashboard