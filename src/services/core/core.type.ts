export type getRoomsParamsType = {
  guests: string
  checkinDate: string
  sort: 'asc' | 'desc'
}

export type getRoomsResponseType = {
  id: number
  name: string
  maxGuests: number
  pricePerNight: number
  availableDates: string[]
  image: string
}
