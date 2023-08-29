export interface Promotion   {
    "total-promos": number
    "partner-name": string
    "promo-data": PromotionData[]
    response?: number
}[]

export interface PromotionData {
    "promo-id": number | null
    "logo": string
    "name": string
    "title": string
    "cashback-percentage": number
    "start-date": string
    "expiry-date": string
    "update-date": string
    "on-going-promo": string
    "splits-details": PromoSplitDetails[]
}

export interface PromoCategory {
    "category-id": number
    "category-name": string
}

export interface PromoSplitDetails {
    "gross-user-share":string
}

export interface AppResponse {
    response: AppResults
}

export interface AppResults {
    response: any
    results: AppOffer[]
}

export interface AppOffer {
    name_text: string
    discount_percentage_number: number | null
    discount_amount_number: number | null
    expiry_date_date: string
    nimda_id_number: number | null
}

export interface ApiArray {
    Id: number | null
    items: ApiArrayItem[]
}

export interface ApiArrayItem {
    Name: string | null
    Discount: string | null
    Expires: string | null
    Source: string | null
}[]

export interface TableProps {
    tableProps: ApiArray[]
  }

  export interface TempAppOffer {
    brand_name: string
    discount_amount: string
    discount_percentage: string
    expiry_date: string
    "nimda id": string
  }