'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface CartItem {
  product_id: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product_id: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { product_id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return { ...state, items: updatedItems, total: 0 }
      } else {
        const newItem = { product_id: action.payload.product_id, quantity: 1 }
        const updatedItems = [...state.items, newItem]
        return { ...state, items: updatedItems, total: 0 }
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.product_id !== action.payload)
      return { ...state, items: updatedItems, total: 0 }
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const updatedItems = state.items.filter(item => item.product_id !== action.payload.product_id)
        return { ...state, items: updatedItems, total: 0 }
      }
      
      const updatedItems = state.items.map(item =>
        item.product_id === action.payload.product_id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return { ...state, items: updatedItems, total: 0 }
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 }
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    
    default:
      return state
  }
}

// Load initial state from localStorage if available
const getInitialState = (): CartState => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('balans-cart')
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        return {
          ...parsed,
          isOpen: false // Always start with cart closed
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
  }
  
  return {
    items: [],
    isOpen: false,
    total: 0
  }
}

const initialState: CartState = getInitialState()

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  // Save to localStorage whenever cart state changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('balans-cart', JSON.stringify({
          items: state.items,
          total: state.total
        }))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state.items, state.total])
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
