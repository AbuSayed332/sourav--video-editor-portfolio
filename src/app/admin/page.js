'use client'
import { useEffect, useState } from 'react'
import { BarChart3, Users, FileText, Award, TrendingUp, Eye, MessageSquare, Star } from 'lucide-react'
import Card from '../components/common/Card'
import apiClient from '../../utils/apiClient'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    portfolio: 0,
    testimonials: 0,
    skills: 0,
    messages: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [portfolioData, testimonialsData, skillsData] = await Promise.all([
        apiClient.getPortfolioItems(),
        apiClient.getTestimonials(),
        apiClient.getSkills()
      ])

      setStats({
        portfolio: portfolioData?.video?.length + portfolioData?.graphics?.length || 0,
        testimonials: testimonialsData?.length || 0,
        skills: (skillsData?.technicalSkills?.length || 0) + (skillsData?.creativeSkills?.length || 0) + (skillsData?.workflowSkills?.length || 0),
        messages: 25 // This would come from contact messages API
      })

      // Mock recent activity data
      setRecentActivity([
        {
          id: 1,
          type: 'portfolio',
          action: 'New video project added',
          time: '2 hours ago',
          icon: FileText
        },
        {
          id: 2,
          type: 'testimonial',
          action: 'New testimonial received',
          time: '4 hours ago',
          icon: MessageSquare
        },
        {
          id: 3,
          type: 'contact',
          action: 'New contact message',
          time: '6 hours ago',
          icon: Users
        }
      ])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Portfolio Items',
      value: stats.portfolio,
      icon: FileText,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600/20',
      change: '+12%',
      changeColor: 'text-green-400'
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: MessageSquare,
      color: 'text-pink-400',
      bgColor: 'bg-pink-600/20',
      change: '+8%',
      changeColor: 'text-green-400'
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: Award,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20',
      change: '+5%',
      changeColor: 'text-green-400'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-600/20',
      change: '+23%',
      changeColor: 'text-green-400'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        
        <div className="flex space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>View Site</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${stat.changeColor}`}>{stat.change}</span>
                  <span className="text-gray-400 text-sm ml-2">vs last month</span>
                </div>
              </div>
              <div className={`p-4 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <div className="p-2 bg-purple-600/20 rounded-full">
                  <activity.icon className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gray-900 border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Site Views</span>
              <span className="text-white font-bold">12,543</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Project Inquiries</span>
              <span className="text-white font-bold">89</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Avg. Session Duration</span>
              <span className="text-white font-bold">3:42</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Conversion Rate</span>
              <span className="text-white font-bold">4.2%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Portfolio Performance</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Chart visualization would go here</p>
              <p className="text-gray-500 text-sm">Integration with Chart.js or similar</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Growth Trends</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Trend analysis chart</p>
              <p className="text-gray-500 text-sm">Monthly growth metrics</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


// 'use client'
// import { useEffect, useState } from 'react'
// import { useAuth } from '../contexts/AuthContext'
// import { BarChart3, Users, FileText, Award, TrendingUp, Eye, MessageSquare, Star, RefreshCw, AlertTriangle } from 'lucide-react'
// import Card from '../components/common/Card'
// import Button from '../components/common/Button'
// import RoleGuard from '../components/auth/RoleGuard'

// export default function AdminDashboard() {
//   const { user, apiCall } = useAuth()
  
//   const [stats, setStats] = useState({
//     portfolio: 0,
//     testimonials: 0,
//     skills: 0,
//     messages: 0,
//     users: 0
//   })
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [recentActivity, setRecentActivity] = useState([])
//   const [performanceData, setPerformanceData] = useState({
//     siteViews: 0,
//     projectInquiries: 0,
//     avgSessionDuration: '0:00',
//     conversionRate: '0%'
//   })
//   const [lastUpdated, setLastUpdated] = useState(null)

//   useEffect(() => {
//     fetchDashboardData()
//     // Auto-refresh every 5 minutes
//     const interval = setInterval(fetchDashboardData, 5 * 60 * 1000)
//     return () => clearInterval(interval)
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true)
//       setError('')
      
//       // Fetch data in parallel with error handling for each endpoint
//       const results = await Promise.allSettled([
//         apiCall('/portfolio'),
//         apiCall('/testimonials'),
//         apiCall('/skills'),
//         apiCall('/messages').catch(() => ({ data: [] })), // Optional endpoint
//         apiCall('/users').catch(() => ({ data: [] })), // Optional endpoint
//         fetchRecentActivity(),
//         fetchPerformanceData()
//       ])

//       // Process portfolio data
//       const portfolioResult = results[0]
//       let portfolioCount = 0
//       if (portfolioResult.status === 'fulfilled') {
//         const portfolioData = portfolioResult.value
//         portfolioCount = (portfolioData?.video?.length || 0) + (portfolioData?.graphics?.length || 0)
//       }

//       // Process testimonials data
//       const testimonialsResult = results[1]
//       let testimonialsCount = 0
//       if (testimonialsResult.status === 'fulfilled') {
//         testimonialsCount = testimonialsResult.value?.length || 0
//       }

//       // Process skills data
//       const skillsResult = results[2]
//       let skillsCount = 0
//       if (skillsResult.status === 'fulfilled') {
//         const skillsData = skillsResult.value
//         skillsCount = (skillsData?.video?.length || 0) + (skillsData?.graphics?.length || 0)
//       }

//       // Process messages data
//       const messagesResult = results[3]
//       let messagesCount = 0
//       if (messagesResult.status === 'fulfilled') {
//         messagesCount = messagesResult.value?.data?.length || messagesResult.value?.length || 0
//       }

//       // Process users data (admin only)
//       const usersResult = results[4]
//       let usersCount = 0
//       if (usersResult.status === 'fulfilled') {
//         usersCount = usersResult.value?.data?.length || usersResult.value?.length || 0
//       }

//       setStats({
//         portfolio: portfolioCount,
//         testimonials: testimonialsCount,
//         skills: skillsCount,
//         messages: messagesCount,
//         users: usersCount
//       })

//       // Process recent activity
//       const activityResult = results[5]
//       if (activityResult.status === 'fulfilled') {
//         setRecentActivity(activityResult.value)
//       }

//       // Process performance data
//       const performanceResult = results[6]
//       if (performanceResult.status === 'fulfilled') {
//         setPerformanceData(performanceResult.value)
//       }

//       setLastUpdated(new Date())

//     } catch (error) {
//       console.error('Error fetching dashboard data:', error)
//       setError(`Failed to load dashboard data: ${error.message}`)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchRecentActivity = async () => {
//     try {
//       // Try to fetch real activity data
//       const response = await apiCall('/dashboard/activity')
//       return response
//     } catch (error) {
//       // Fallback to mock data if endpoint doesn't exist
//       return [
//         {
//           id: 1,
//           type: 'portfolio',
//           action: 'New video project added',
//           time: formatTimeAgo(new Date(Date.now() - 2 * 60 * 60 * 1000)),
//           icon: FileText,
//           user: user?.name || 'Admin'
//         },
//         {
//           id: 2,
//           type: 'testimonial',
//           action: 'New testimonial received',
//           time: formatTimeAgo(new Date(Date.now() - 4 * 60 * 60 * 1000)),
//           icon: MessageSquare,
//           user: 'Client'
//         },
//         {
//           id: 3,
//           type: 'contact',
//           action: 'New contact message',
//           time: formatTimeAgo(new Date(Date.now() - 6 * 60 * 60 * 1000)),
//           icon: Users,
//           user: 'Visitor'
//         }
//       ]
//     }
//   }

//   const fetchPerformanceData = async () => {
//     try {
//       // Try to fetch real analytics data
//       const response = await apiCall('/dashboard/analytics')
//       return response
//     } catch (error) {
//       // Fallback to mock data
//       return {
//         siteViews: Math.floor(Math.random() * 20000) + 10000,
//         projectInquiries: Math.floor(Math.random() * 100) + 50,
//         avgSessionDuration: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
//         conversionRate: `${(Math.random() * 10 + 2).toFixed(1)}%`
//       }
//     }
//   }

//   const formatTimeAgo = (date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
//     if (diffInMinutes < 60) {
//       return `${diffInMinutes} minutes ago`
//     }
//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) {
//       return `${diffInHours} hours ago`
//     }
//     const diffInDays = Math.floor(diffInHours / 24)
//     return `${diffInDays} days ago`
//   }

//   const getStatCards = () => {
//     const baseCards = [
//       {
//         title: 'Portfolio Items',
//         value: stats.portfolio,
//         icon: FileText,
//         color: 'text-purple-400',
//         bgColor: 'bg-purple-600/20',
//         change: '+12%',
//         changeColor: 'text-green-400',
//         href: '/admin/portfolio'
//       },
//       {
//         title: 'Testimonials',
//         value: stats.testimonials,
//         icon: MessageSquare,
//         color: 'text-pink-400',
//         bgColor: 'bg-pink-600/20',
//         change: '+8%',
//         changeColor: 'text-green-400',
//         href: '/admin/testimonials'
//       },
//       {
//         title: 'Skills',
//         value: stats.skills,
//         icon: Award,
//         color: 'text-blue-400',
//         bgColor: 'bg-blue-600/20',
//         change: '+5%',
//         changeColor: 'text-green-400',
//         href: '/admin/skills'
//       },
//       {
//         title: 'Messages',
//         value: stats.messages,
//         icon: Users,
//         color: 'text-green-400',
//         bgColor: 'bg-green-600/20',
//         change: '+23%',
//         changeColor: 'text-green-400',
//         href: '/admin/messages'
//       }
//     ]

//     // Add users card for admin users
//     if (user?.role === 'admin' || user?.role === 'super_admin') {
//       baseCards.push({
//         title: 'Users',
//         value: stats.users,
//         icon: Users,
//         color: 'text-yellow-400',
//         bgColor: 'bg-yellow-600/20',
//         change: '+15%',
//         changeColor: 'text-green-400',
//         href: '/admin/users'
//       })
//     }

//     return baseCards
//   }

//   const handleRefresh = () => {
//     fetchDashboardData()
//   }

//   const handleCardClick = (href) => {
//     if (href && window) {
//       window.location.href = href
//     }
//   }

//   if (loading && !lastUpdated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
//           <p className="text-gray-400">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//           <p className="text-gray-400 mt-1">
//             Welcome back, {user?.name || 'Admin'}! Here's what's happening with your portfolio.
//           </p>
//           {lastUpdated && (
//             <p className="text-gray-500 text-sm mt-1">
//               Last updated: {lastUpdated.toLocaleTimeString()}
//             </p>
//           )}
//         </div>
        
//         <div className="flex space-x-4">
//           <Button
//             onClick={handleRefresh}
//             disabled={loading}
//             variant="outline"
//             className="flex items-center space-x-2"
//           >
//             <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//             <span>Refresh</span>
//           </Button>
          
//           <Button 
//             onClick={() => window.open('/', '_blank')}
//             className="flex items-center space-x-2"
//           >
//             <Eye className="w-4 h-4" />
//             <span>View Site</span>
//           </Button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <Card className="bg-red-900/20 border-red-500/50 p-4">
//           <div className="flex items-center space-x-2">
//             <AlertTriangle className="w-5 h-5 text-red-400" />
//             <span className="text-red-300">{error}</span>
//           </div>
//         </Card>
//       )}

//       {/* Stats Grid */}
//       <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${getStatCards().length > 4 ? '5' : '4'} gap-6`}>
//         {getStatCards().map((stat, index) => (
//           <Card 
//             key={index} 
//             className={`bg-gray-900 border-gray-700 p-6 transition-all duration-200 ${
//               stat.href ? 'cursor-pointer hover:bg-gray-800 hover:border-gray-600' : ''
//             }`}
//             onClick={() => handleCardClick(stat.href)}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {loading ? (
//                     <div className="animate-pulse bg-gray-700 h-8 w-16 rounded"></div>
//                   ) : (
//                     stat.value
//                   )}
//                 </p>
//                 <div className="flex items-center mt-2">
//                   <span className={`text-sm ${stat.changeColor}`}>{stat.change}</span>
//                   <span className="text-gray-400 text-sm ml-2">vs last month</span>
//                 </div>
//               </div>
//               <div className={`p-4 rounded-full ${stat.bgColor}`}>
//                 <stat.icon className={`w-8 h-8 ${stat.color}`} />
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activity */}
//         <Card className="bg-gray-900 border-gray-700 p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-bold text-white">Recent Activity</h3>
//             <button 
//               onClick={handleRefresh}
//               className="text-gray-400 hover:text-white transition-colors"
//             >
//               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//           <div className="space-y-4">
//             {loading ? (
//               // Loading skeleton
//               Array(3).fill(0).map((_, i) => (
//                 <div key={i} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg animate-pulse">
//                   <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
//                   <div className="flex-1 space-y-2">
//                     <div className="h-4 bg-gray-700 rounded w-3/4"></div>
//                     <div className="h-3 bg-gray-700 rounded w-1/2"></div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               recentActivity.map((activity) => (
//                 <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
//                   <div className="p-2 bg-purple-600/20 rounded-full">
//                     <activity.icon className="w-4 h-4 text-purple-400" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-white font-medium">{activity.action}</p>
//                     <p className="text-gray-400 text-sm flex items-center space-x-2">
//                       <span>{activity.time}</span>
//                       {activity.user && (
//                         <>
//                           <span>•</span>
//                           <span>by {activity.user}</span>
//                         </>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </Card>

//         {/* Performance Overview */}
//         <Card className="bg-gray-900 border-gray-700 p-6">
//           <h3 className="text-xl font-bold text-white mb-4">Performance Overview</h3>
//           <div className="space-y-4">
//             {[
//               { label: 'Site Views', value: performanceData.siteViews.toLocaleString() },
//               { label: 'Project Inquiries', value: performanceData.projectInquiries },
//               { label: 'Avg. Session Duration', value: performanceData.avgSessionDuration },
//               { label: 'Conversion Rate', value: performanceData.conversionRate }
//             ].map((item, index) => (
//               <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
//                 <span className="text-gray-300">{item.label}</span>
//                 <span className="text-white font-bold">
//                   {loading ? (
//                     <div className="animate-pulse bg-gray-700 h-5 w-16 rounded"></div>
//                   ) : (
//                     item.value
//                   )}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="bg-gray-900 border-gray-700 p-6">
//           <h3 className="text-xl font-bold text-white mb-4">Portfolio Performance</h3>
//           <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
//             <div className="text-center">
//               <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//               <p className="text-gray-400">Interactive chart coming soon</p>
//               <p className="text-gray-500 text-sm">Portfolio views and engagement metrics</p>
//             </div>
//           </div>
//         </Card>

//         <Card className="bg-gray-900 border-gray-700 p-6">
//           <h3 className="text-xl font-bold text-white mb-4">Growth Trends</h3>
//           <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
//             <div className="text-center">
//               <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//               <p className="text-gray-400">Growth analytics visualization</p>
//               <p className="text-gray-500 text-sm">Monthly progress tracking</p>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Admin Only Section */}
//       <RoleGuard requiredRole="admin">
//         <Card className="bg-gray-900 border-gray-700 p-6">
//           <h3 className="text-xl font-bold text-white mb-4">System Overview</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <p className="text-gray-400 text-sm">API Status</p>
//               <p className="text-green-400 font-bold">Online</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <p className="text-gray-400 text-sm">Database</p>
//               <p className="text-green-400 font-bold">Connected</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <p className="text-gray-400 text-sm">Last Backup</p>
//               <p className="text-blue-400 font-bold">2 hours ago</p>
//             </div>
//           </div>
//         </Card>
//       </RoleGuard>
//     </div>
//   )
// }