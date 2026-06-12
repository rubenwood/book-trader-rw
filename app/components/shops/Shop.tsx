type Shop = {
  id: number
  createdAt: Date

  name: string
  description: string

  // pricing model
  books_per_deal: number // 10
  deal_price: number // 1.00

  latitude: number
  longitude: number  
}