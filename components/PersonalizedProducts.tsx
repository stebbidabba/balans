'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface UserMetadata {
  full_name?: string
  date_of_birth?: string
  gender?: string
  phone?: string
}

interface Product {
  id: string
  name: string
  description: string
  price_isk: number
  category: string
  recommended_for: string[]
  age_groups: string[]
  gender_specific?: boolean
}

export default function PersonalizedProducts() {
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

  // Product database with personalized recommendations
  const products: Product[] = [
    {
      id: '1',
      name: 'Testosterone Kit',
      description: 'Track free testosterone with a simple saliva test.',
      price_isk: 12900,
      category: 'hormones',
      recommended_for: ['male', 'performance', 'energy'],
      age_groups: ['adult', 'middle-aged'],
      gender_specific: true
    },
    {
      id: '2',
      name: 'Stress & Energy Kit',
      description: 'Assess cortisol and related markers to understand stress load.',
      price_isk: 14400,
      category: 'stress',
      recommended_for: ['stress', 'energy', 'sleep'],
      age_groups: ['young', 'adult', 'middle-aged', 'mature']
    },
    {
      id: '3',
      name: 'Complete Hormone Panel',
      description: 'Comprehensive analysis of key hormones for optimal health.',
      price_isk: 19900,
      category: 'comprehensive',
      recommended_for: ['comprehensive', 'baseline'],
      age_groups: ['adult', 'middle-aged', 'mature']
    },
    {
      id: '4',
      name: 'Fertility & Reproductive Health',
      description: 'Track reproductive hormones for fertility optimization.',
      price_isk: 16900,
      category: 'fertility',
      recommended_for: ['fertility', 'reproductive'],
      age_groups: ['young', 'adult'],
      gender_specific: true
    },
    {
      id: '5',
      name: 'Menopause & Perimenopause Panel',
      description: 'Monitor hormone changes during menopause transition.',
      price_isk: 18900,
      category: 'menopause',
      recommended_for: ['menopause', 'perimenopause'],
      age_groups: ['middle-aged', 'mature'],
      gender_specific: true
    },
    {
      id: '6',
      name: 'Performance & Recovery Kit',
      description: 'Optimize athletic performance and recovery markers.',
      price_isk: 15900,
      category: 'performance',
      recommended_for: ['performance', 'athletic', 'recovery'],
      age_groups: ['young', 'adult']
    }
  ]

  // Get personalized product recommendations
  const getPersonalizedProducts = () => {
    if (!age || !gender) {
      // Return general recommendations if no personal data
      return products.filter(p => !p.gender_specific)
    }

    // Determine age group
    let ageGroup = ''
    if (age < 25) ageGroup = 'young'
    else if (age < 40) ageGroup = 'adult'
    else if (age < 55) ageGroup = 'middle-aged'
    else ageGroup = 'mature'

    // Filter products based on personal data
    return products.filter(product => {
      // Check age group compatibility
      const ageMatch = product.age_groups.includes(ageGroup)
      
      // Check gender compatibility
      const genderMatch = !product.gender_specific || 
        (product.gender_specific && product.recommended_for.includes(gender))
      
      return ageMatch && genderMatch
    })
  }

  const personalizedProducts = getPersonalizedProducts()

  if (loading) {
    return <div className="animate-pulse">Loading personalized recommendations...</div>
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Recommended for You
        </h2>
        {age && gender ? (
          <p className="text-text-muted">
            Based on your profile: {age} years old, {gender}
          </p>
        ) : (
          <p className="text-text-muted">
            Complete your profile for personalized recommendations
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {personalizedProducts.map((product) => (
          <div key={product.id} className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand/30 transition-all">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-text-muted text-sm mb-4">{product.description}</p>
              
              {/* Personalization badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.recommended_for.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-brand/20 text-brand text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-brand">
                {product.price_isk.toLocaleString()} ISK
              </span>
              <Link 
                href={`/checkout?product=${product.id}&qty=1`}
                className="px-4 py-2 bg-brand text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Products */}
      <div className="text-center">
        <Link 
          href="/shop"
          className="inline-block px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}
