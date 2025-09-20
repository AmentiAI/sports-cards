'use client'

import { useState } from 'react'
import { Users, MessageCircle, Trophy, Heart, Share2, Bookmark, TrendingUp } from 'lucide-react'

const communityPosts = [
  {
    id: 1,
    user: "CollectorMike92",
    avatar: "M",
    time: "2 hours ago",
    content: "Just picked up this beauty from Vintage 90s Sports Cards! 1993 SP Derek Jeter rookie in PSA 9 condition. The authentication process was seamless and the card arrived in perfect condition. Highly recommend!",
    image: "/api/placeholder/300/200",
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: false,
    isBookmarked: false,
    featured: true
  },
  {
    id: 2,
    user: "SarahCollects",
    avatar: "S",
    time: "5 hours ago",
    content: "Finally completed my 1995 Topps Finest set! Thanks to the amazing selection at Vintage 90s Sports Cards. The condition descriptions are always spot-on.",
    image: "/api/placeholder/300/200",
    likes: 23,
    comments: 7,
    shares: 3,
    isLiked: true,
    isBookmarked: false,
    featured: false
  },
  {
    id: 3,
    user: "CardKing_J",
    avatar: "J",
    time: "1 day ago",
    content: "Shoutout to the team for helping me find this rare 1996 Topps Chrome Jordan refractor. Customer service is top-notch and they really know their cards!",
    image: "/api/placeholder/300/200",
    likes: 89,
    comments: 24,
    shares: 15,
    isLiked: false,
    isBookmarked: true,
    featured: false
  }
]

const achievements = [
  { icon: Trophy, title: "Collection Master", description: "Own 100+ graded cards", color: "text-yellow-400" },
  { icon: Heart, title: "Card Lover", description: "Like 50+ community posts", color: "text-red-400" },
  { icon: Share2, title: "Community Helper", description: "Share 25+ helpful posts", color: "text-blue-400" },
  { icon: TrendingUp, title: "Trending Collector", description: "Get 100+ likes on posts", color: "text-green-400" }
]

export default function CollectorCommunity() {
  const [posts, setPosts] = useState(communityPosts)

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ))
  }

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            <span>COLLECTOR COMMUNITY</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Join the <span className="gradient-text">Ultimate</span> Collector Community
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Connect with fellow collectors, share your finds, and get expert advice from the community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Community posts */}
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                {post.featured && (
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold inline-block mb-4">
                    ⭐ FEATURED POST
                  </div>
                )}
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{post.user}</h4>
                    <p className="text-slate-400 text-sm">{post.time}</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-4 leading-relaxed">{post.content}</p>

                {/* Post image placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl mb-4 flex items-center justify-center border border-slate-600">
                  <div className="text-center">
                    <div className="w-20 h-28 bg-gradient-to-br from-white/20 to-white/10 rounded-lg mx-auto mb-2 border border-white/30 flex items-center justify-center">
                      <span className="text-white/60 text-xs font-bold">CARD</span>
                    </div>
                    <p className="text-slate-400 text-sm">Card image</p>
                  </div>
                </div>

                {/* Engagement buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleBookmark(post.id)}
                    className={`transition-colors ${
                      post.isBookmarked ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            ))}

            {/* Join community CTA */}
            <div className="glass-effect rounded-2xl p-8 text-center border-2 border-dashed border-slate-600">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Community?</h3>
              <p className="text-slate-300 mb-6">
                Share your collection, get advice, and connect with fellow collectors
              </p>
              <button className="btn-primary">
                Join Collector Community
              </button>
            </div>
          </div>

          {/* Right column - Achievements and stats */}
          <div className="space-y-6">
            {/* Community stats */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Active Members</span>
                  <span className="text-white font-bold">5,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Posts This Week</span>
                  <span className="text-white font-bold">1,892</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Cards Shared</span>
                  <span className="text-white font-bold">12,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Expert Reviews</span>
                  <span className="text-white font-bold">3,421</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Collector Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                    <div>
                      <div className="text-white font-semibold text-sm">{achievement.title}</div>
                      <div className="text-slate-400 text-xs">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-outline text-left">
                  📸 Share Your Collection
                </button>
                <button className="w-full btn-outline text-left">
                  💬 Ask the Community
                </button>
                <button className="w-full btn-outline text-left">
                  📚 Browse Card Guides
                </button>
                <button className="w-full btn-outline text-left">
                  🏆 View Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


