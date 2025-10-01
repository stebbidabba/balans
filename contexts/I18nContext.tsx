'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'en' | 'is'

type Dictionary = Record<string, string>

const en: Dictionary = {
  nav_product: 'Product',
  nav_shop: 'Shop',
  nav_results: 'Process & Results',
  nav_about: 'About',
  nav_company: 'The Company',
  nav_lab: 'The Lab',
  nav_contact: 'Contact',
  nav_login: 'Log in',
  nav_signup: 'Sign Up',
  nav_account: 'Account',
  nav_cart: 'Cart',
  footer_testosterone: 'Testosterone Kit',
  footer_stress_energy: 'Stress & Energy Kit',
  footer_how: 'How it works',
  footer_science: 'Science',
  footer_faq: 'FAQ',
  footer_company: 'Company',
  footer_about: 'About',
  footer_contact: 'Contact',
  footer_careers: 'Careers',
  footer_news: 'News',
  footer_resources: 'Resources',
  footer_insights: 'Insights',
  footer_guides: 'Guides',
  footer_support: 'Support',
  footer_have_questions: 'Have questions?',
  footer_contact_us: 'Contact us',
  footer_get_updates: 'Get updates',
  footer_email_prompt: "Drop us your email to learn what's next.",
  footer_email_placeholder: 'your@email.com',
  footer_copyright: '© Balans. All rights reserved.',
  footer_privacy: 'Privacy policy',
  footer_terms: 'Terms of service',
  results_loading: 'Loading your results...',
  go_to_login: 'Go to Login',
  results_title: 'Your Test Results',
  results_subtitle: 'Hormone analysis from your lab tests',
  results_empty: 'No results yet',
  results_empty_desc: 'Your test results will appear here once analysis is complete',
  view_my_orders: 'View My Orders',
  order_hash: 'Order #',
  tested_on: 'Tested on',
  reference_range: 'Reference Range',
  lab_notes: 'Lab Notes',
  kit_code: 'Kit Code',
  back_to_account: 'Back to Account',
  checkout_title: 'Checkout',
  product: 'Product',
  quantity: 'Quantity',
  unit_price: 'Unit Price',
  total: 'Total',
  contact_info: 'Contact Information',
  email_address: 'Email Address',
  setting_up_payment: 'Setting up payment...',
  continue_to_payment: 'Continue to Payment',
  hero_headline_1: 'The all-in-one home testing platform for',
  hero_headline_2: 'hormone health',
  hero_subheadline: 'Order an at-home kit, send your sample, and get clear results — all under your own private dashboard.',
  get_started: 'Get started',
  no_spam: 'No spam. Cancel anytime.',

  // Shop Page
  loading_products: 'Loading Products...',
  shop_hormone_testing_kits: 'Shop Hormone Testing Kits',
  shop_description: 'Choose from our range of at-home hormone testing kits designed to help you understand and optimize your health.',
  all_products: 'All Products',
  browse_complete_collection: 'Browse our complete collection of hormone testing kits',
  popular: 'Popular',
  coming_soon: 'Coming Soon',
  price_on_request: 'Price on request',
  buy_now: 'Buy Now',
  add_to_cart: 'Add to Cart',
  view_details: 'View Details',
  price_tbd: 'TBD',
  fallback_products_note: 'Note: Using fallback products. Database',
  womens_panel: "Women's Panel",
  womens_panel_description: "Specialized hormone testing designed for women's health.",

  // Product Features
  feature_saliva_tube: 'Saliva tube + prepaid return',
  feature_results_3_5_days: 'Results in 3–5 days',
  feature_private_dashboard: 'Private online dashboard',
  feature_personalized_recommendations: 'Personalized recommendations',
  feature_morning_evening: 'Morning & evening collection',
  feature_lab_grade_analysis: 'Lab-grade analysis',
  feature_actionable_insights: 'Actionable insights',
  feature_stress_management_tips: 'Stress management tips',
  feature_full_hormone_spectrum: 'Full hormone spectrum',
  feature_advanced_biomarkers: 'Advanced biomarkers',
  feature_detailed_health_report: 'Detailed health report',
  feature_expert_guidance: 'Expert guidance for complex cases',
  feature_female_specific: 'Female-specific hormones',
  feature_cycle_tracking: 'Cycle tracking insights',
  feature_fertility_markers: 'Fertility markers',
  feature_menopause_indicators: 'Menopause indicators',

  // HowItWorks
  how_it_works: 'How it works',
  step_order: 'Order',
  step_order_desc: 'We ship your kit within 24h.',
  step_collect: 'Collect',
  step_collect_desc: 'Follow the 3-minute instructions.',
  step_return: 'Return',
  step_return_desc: 'Drop at post box with prepaid label.',
  step_results: 'Results',
  step_results_desc: 'See your results and next steps online.',

  // FeatureCards
  order_now: 'Order now',

  // FAQ
  faq_title: 'Frequently asked questions',
  faq_accuracy_q: 'How accurate are the tests?',
  faq_accuracy_a: 'We use certified partner labs and validated ELISA methodology with quality controls on each run.',
  faq_results_time_q: 'How long do results take?',
  faq_results_time_a: 'Typically 3–5 business days after the lab receives your sample.',
  faq_privacy_q: 'Is my data private?',
  faq_privacy_a: 'Yes. All results are encrypted and only accessible in your dashboard.',
  faq_shipping_q: 'Do you ship to Iceland?',
  faq_shipping_a: 'Yes, national shipping is supported. International options coming soon.',

  // AppShowcase
  track_your_progress: 'Track Your Progress',
  track_progress_description: 'Monitor your hormone levels over time and get personalized insights to optimize your health journey.',
  track_progress: 'Track Progress',
  track_progress_desc: 'See how your hormone levels change over time and identify patterns that help you understand your body better.',
  personalized_recommendations: 'Personalized Recommendations',
  personalized_recommendations_desc: 'Get tailored recommendations based on your results for nutrition, exercise, and lifestyle changes.',
  reminders_plans: 'Reminders & Plans',
  reminders_plans_desc: 'Set up reminders for your next tests and follow personalized plans to improve your hormone balance.',

  // CartSidebar
  your_bag: 'YOUR BAG',
  cart_is_empty: 'Your bag is empty',
  continue_shopping: 'Continue shopping',
  item: 'item',
  items: 'items',
  checkout: 'CHECKOUT',
}

const isDict: Dictionary = {
  nav_product: 'Vörur',
  nav_shop: 'Verslun',
  nav_results: 'Ferli & Niðurstöður',
  nav_about: 'Um',
  nav_company: 'Fyrirtækið',
  nav_lab: 'Rannsóknastofan',
  nav_contact: 'Hafa samband',
  nav_login: 'Innskrá',
  nav_signup: 'Nýskrá',
  nav_account: 'Aðgangur',
  nav_cart: 'Karfa',
  footer_testosterone: 'Testósterón próf',
  footer_stress_energy: 'Streitu & Orku próf',
  footer_how: 'Hvernig virkar þetta',
  footer_science: 'Vísindin',
  footer_faq: 'Algengar spurningar',
  footer_company: 'Fyrirtækið',
  footer_about: 'Um okkur',
  footer_contact: 'Hafa samband',
  footer_careers: 'Starf',
  footer_news: 'Fréttir',
  footer_resources: 'Efni',
  footer_insights: 'Innsýn',
  footer_guides: 'Leiðbeiningar',
  footer_support: 'Aðstoð',
  footer_have_questions: 'Með spurningar?',
  footer_contact_us: 'Hafðu samband',
  footer_get_updates: 'Fáðu fréttir',
  footer_email_prompt: 'Skráðu netfangið til að fá uppfærslur.',
  footer_email_placeholder: 'netfang@dæmi.is',
  footer_copyright: '© Balans. Öll réttindi áskilin.',
  footer_privacy: 'Persónuvernd',
  footer_terms: 'Skilmálar',
  results_loading: 'Hleð niðurstöðum...',
  go_to_login: 'Fara á innskráningu',
  results_title: 'Niðurstöður þínar',
  results_subtitle: 'Hormatímarit úr rannsókn',
  results_empty: 'Engar niðurstöður ennþá',
  results_empty_desc: 'Niðurstöður birtast hér þegar greiningu er lokið',
  view_my_orders: 'Skoða pantanir',
  order_hash: 'Pöntun #',
  tested_on: 'Prófað þann',
  reference_range: 'Viðmiðunarbili',
  lab_notes: 'Athugasemdir',
  kit_code: 'Kitkóði',
  back_to_account: 'Til baka í aðgang',
  checkout_title: 'Greiðsla',
  product: 'Vara',
  quantity: 'Magn',
  unit_price: 'Einingarverð',
  total: 'Samtals',
  contact_info: 'Tengiliðaupplýsingar',
  email_address: 'Netfang',
  setting_up_payment: 'Set upp greiðslu...',
  continue_to_payment: 'Halda áfram í greiðslu',
  hero_headline_1: 'Öll próf á einum stað heima fyrir fyrir',
  hero_headline_2: 'hormónaheilbrigði',
  hero_subheadline: 'Pantaðu heimapróf, sendu sýni og fáðu skýrar niðurstöður — allt á þínum einkaaðgangi.',
  get_started: 'Byrja',
  no_spam: 'Enginn ruslpóstur. Hægt að hætta hvenær sem er.',

  // Shop Page
  loading_products: 'Hleð vörur...',
  shop_hormone_testing_kits: 'Versla hormónapróf',
  shop_description: 'Veldu úr úrvali heimaprófa fyrir hormóna sem hjálpa þér að skilja og bæta heilsu þína.',
  all_products: 'Allar vörur',
  browse_complete_collection: 'Skoðaðu allt úrval okkar af hormónaprófum',
  popular: 'Vinsælt',
  coming_soon: 'Væntanlegt',
  price_on_request: 'Verð á fyrirspurn',
  buy_now: 'Kaupa núna',
  add_to_cart: 'Setja í körfu',
  view_details: 'Skoða nánar',
  price_tbd: 'Óákveðið',
  fallback_products_note: 'Athugið: Nota varavörur. Gagnagrunnur',
  womens_panel: 'Kvennarpróf',
  womens_panel_description: 'Sérhæft hormónapróf hannað fyrir kvennheilbrigði.',

  // Product Features
  feature_saliva_tube: 'Munnvatnsrör + fyrirframgreitt skil',
  feature_results_3_5_days: 'Niðurstöður á 3–5 dögum',
  feature_private_dashboard: 'Einkaaðgangur á netinu',
  feature_personalized_recommendations: 'Persónulegar ráðleggingar',
  feature_morning_evening: 'Morgun- og kvöldsöfnun',
  feature_lab_grade_analysis: 'Rannsóknastofu greining',
  feature_actionable_insights: 'Nothæf innsýn',
  feature_stress_management_tips: 'Ráðleggingar um streitustjórnun',
  feature_full_hormone_spectrum: 'Fullt hormónaspektrum',
  feature_advanced_biomarkers: 'Háþróaðir lífmerkjar',
  feature_detailed_health_report: 'Nákvæm heilsuskýrsla',
  feature_expert_guidance: 'Sérfræðileiðbeiningar fyrir flókin mál',
  feature_female_specific: 'Kvennasértæk hormón',
  feature_cycle_tracking: 'Innsýn í blæðingahring',
  feature_fertility_markers: 'Frjósemismerkjar',
  feature_menopause_indicators: 'Tímabilsmerkjar',

  // HowItWorks
  how_it_works: 'Hvernig það virkar',
  step_order: 'Panta',
  step_order_desc: 'Við sendum próf innan 24 klst.',
  step_collect: 'Safna',
  step_collect_desc: 'Fylgdu 3 mínútna leiðbeiningunum.',
  step_return: 'Skila',
  step_return_desc: 'Settu í póst með fyrirframgreiddum miða.',
  step_results: 'Niðurstöður',
  step_results_desc: 'Sjáðu niðurstöður og næstu skref á netinu.',

  // FeatureCards
  order_now: 'Panta núna',

  // FAQ
  faq_title: 'Algengar spurningar',
  faq_accuracy_q: 'Hversu nákvæm eru prófin?',
  faq_accuracy_a: 'Við notum viðurkenndar samstarfsrannsóknastofur og staðfesta ELISA aðferðafræði með gæðaeftirliti í hverju keyrslu.',
  faq_results_time_q: 'Hversu lengi taka niðurstöður?',
  faq_results_time_a: 'Venjulega 3–5 virkir dagar eftir að rannsóknastofa fær sýnið þitt.',
  faq_privacy_q: 'Eru gögnin mín einkamál?',
  faq_privacy_a: 'Já. Allar niðurstöður eru dulkóðaðar og aðeins aðgengilegar í þínum aðgangi.',
  faq_shipping_q: 'Sendið þið til Íslands?',
  faq_shipping_a: 'Já, innanlandssending er studd. Alþjóðlegir valkostir koma bráðlega.',

  // AppShowcase
  track_your_progress: 'Fylgstu með framförum',
  track_progress_description: 'Fylgstu með hormónastigum þínum yfir tíma og fáðu persónulega innsýn til að bæta heilsuferðina þína.',
  track_progress: 'Fylgjast með framförum',
  track_progress_desc: 'Sjáðu hvernig hormónastigin þín breytast yfir tíma og finndu mynstur sem hjálpa þér að skilja líkamann þinn betur.',
  personalized_recommendations: 'Persónulegar ráðleggingar',
  personalized_recommendations_desc: 'Fáðu sérsniðnar ráðleggingar byggðar á niðurstöðum þínum fyrir næringu, hreyfingu og lífsstílsbreytingar.',
  reminders_plans: 'Áminningar og áætlanir',
  reminders_plans_desc: 'Settu upp áminningar fyrir næstu próf og fylgdu persónulegum áætlunum til að bæta hormónajafnvægi þitt.',

  // CartSidebar
  your_bag: 'ÞINN POKI',
  cart_is_empty: 'Pokinn þinn er tómur',
  continue_shopping: 'Halda áfram að versla',
  item: 'vara',
  items: 'vörur',
  checkout: 'GREIÐA',
}

const dictByLang: Record<Language, Dictionary> = { en, is: isDict }

type I18nContextValue = {
  lang: Language
  setLang: (l: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Language | null) : null
    if (stored === 'en' || stored === 'is') setLangState(stored)
  }, [])

  const setLang = (l: Language) => {
    setLangState(l)
    if (typeof window !== 'undefined') localStorage.setItem('lang', l)
    document.cookie = `lang=${l}; path=/; max-age=31536000`
  }

  const t = (key: string) => dictByLang[lang][key] ?? key

  const value = useMemo(() => ({ lang, setLang, t }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}


