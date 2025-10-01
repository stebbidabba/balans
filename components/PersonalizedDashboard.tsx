'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'

interface UserMetadata {
  full_name?: string
  date_of_birth?: string
  gender?: string
  phone?: string
}

export default function PersonalizedDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [userMetadata, setUserMetadata] = useState<UserMetadata>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        setUserMetadata(user.user_metadata || {})
        
        // Also fetch profile data from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('date_of_birth, gender, full_name, phone')
          .eq('user_id', user.id)
          .single()
        
        if (profile) {
          setUserMetadata(prev => ({
            ...prev,
            date_of_birth: profile.date_of_birth,
            gender: profile.gender,
            full_name: profile.full_name,
            phone: profile.phone
          }))
        }
      }
      setLoading(false)
    }

    getUserData()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading your personalized dashboard...</div>
  }

  if (!user) {
    return <div>Please log in to see your personalized dashboard.</div>
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const age = userMetadata.date_of_birth ? calculateAge(userMetadata.date_of_birth) : null
  const gender = userMetadata.gender
  const fullName = userMetadata.full_name

  // Personalized content based on age and gender
  const getPersonalizedContent = () => {
    if (!age || !gender) {
      return {
        title: "Welcome to Your Health Journey",
        subtitle: "Complete your profile to get personalized insights",
        recommendations: [
          "Complete your profile information",
          "Take your first hormone test",
          "Explore our health resources"
        ],
        tips: [
          "Regular testing helps track your health trends",
          "Our tests are designed for accuracy and convenience"
        ]
      }
    }

    // Age-based recommendations
    let ageGroup = ""
    let ageRecommendations = []
    
    if (age < 25) {
      ageGroup = "young adult"
      ageRecommendations = [
        "Establish healthy hormone baseline",
        "Monitor stress and energy levels",
        "Track athletic performance markers"
      ]
    } else if (age < 40) {
      ageGroup = "adult"
      ageRecommendations = [
        "Monitor fertility and reproductive health",
        "Track stress and cortisol patterns",
        "Optimize energy and performance"
      ]
    } else if (age < 55) {
      ageGroup = "middle-aged adult"
      ageRecommendations = [
        "Monitor perimenopause/menopause markers",
        "Track stress and sleep quality",
        "Optimize metabolic health"
      ]
    } else {
      ageGroup = "mature adult"
      ageRecommendations = [
        "Monitor post-menopause health",
        "Track bone health markers",
        "Optimize longevity and vitality"
      ]
    }

    // Gender-specific content
    let genderSpecificTips = []
    let genderSpecificTests = []
    
    if (gender === 'female') {
      genderSpecificTips = [
        "Track your menstrual cycle patterns",
        "Monitor estrogen and progesterone levels",
        "Consider testing during different cycle phases"
      ]
      genderSpecificTests = [
        "Complete Hormone Panel (includes estrogen, progesterone)",
        "Stress & Energy Kit (cortisol patterns)",
        "Fertility & Reproductive Health Panel"
      ]
    } else if (gender === 'male') {
      genderSpecificTips = [
        "Monitor testosterone levels regularly",
        "Track muscle mass and energy markers",
        "Consider testing in the morning for optimal results"
      ]
      genderSpecificTests = [
        "Testosterone Kit (free and total testosterone)",
        "Stress & Energy Kit (cortisol and energy)",
        "Performance & Recovery Panel"
      ]
    } else {
      genderSpecificTips = [
        "Choose tests based on your health goals",
        "Monitor stress and energy levels",
        "Track overall hormonal balance"
      ]
      genderSpecificTests = [
        "Complete Hormone Panel",
        "Stress & Energy Kit",
        "Custom Health Assessment"
      ]
    }

    return {
      title: `Welcome back, ${fullName || 'there'}!`,
      subtitle: `Your personalized ${ageGroup} health dashboard`,
      recommendations: ageRecommendations,
      tips: genderSpecificTips,
      suggestedTests: genderSpecificTests,
      age,
      gender
    }
  }

  const content = getPersonalizedContent()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-brand/20 to-purple-500/20 rounded-2xl p-6 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-2">{content.title}</h1>
        <p className="text-text-muted">{content.subtitle}</p>
        
        {content.age && content.gender && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-brand/20 text-brand rounded-full text-sm">
              {content.age} years old
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              {content.gender}
            </span>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Recommended for You</h2>
        <ul className="space-y-3">
          {content.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-text-muted">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Health Tips */}
      <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Health Tips</h2>
        <ul className="space-y-3">
          {content.tips.map((tip, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-text-muted">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Tests */}
      {content.suggestedTests && (
        <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Recommended Tests</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.suggestedTests.map((test, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">{test}</h3>
                <button className="text-brand hover:text-brand/80 text-sm font-medium">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Completion */}
      {(!age || !gender) && (
        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Complete Your Profile</h2>
          <p className="text-text-muted mb-4">
            Add your age and gender to get more personalized recommendations and insights.
          </p>
          <button className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-xl hover:bg-yellow-400/30 transition-all">
            Update Profile
          </button>
        </div>
      )}
    </div>
  )
}
