export interface Item {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
  count?: number
}

export interface Rating {
  rate: number
  count: number
}
