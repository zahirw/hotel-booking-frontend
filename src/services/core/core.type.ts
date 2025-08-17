export type getRoomsParamsType = {
  guests: string
  checkinDate: string
  sort: 'asc' | 'desc'
}

export type getRoomParamsType = {
  id: string
}

export type getRoomsResponseType = {
  id: number
  name: string
  maxGuests: number
  pricePerNight: number
  availableDates: string[]
  image: string
}

export type getBookingByIdParamsType = {
  id: string
}

export type getBookingsParamsType = {
  userId: string
}

export type getBookingByIdResponseType = {
  id: string
  userId: string
  roomId: string
  checkin: string
  checkout: string
  contactId: string
}

export type postBookingRoomParamsType = {
  roomId: string
  checkin: string
  checkout: string
  userId: string
}

export type patchBookingRoomParamsType = {
  id: string
  contactId: string
}

export type postBookingRoomResponseType = {
  message: string
  booking: {
    id: string
    userId: string
    roomId: string
    checkin: string
    checkout: string
    contactId: string
  }
}

export type patchBookingRoomResponseType = {
  message: string
}

export type postContactParamsType = {
  title: string
  name: string
  email: string
  userId: string
}

export type postContactResponseType = {
  message: string
  contact: {
    id: string
    title: string
    name: string
    email: string
    userId: string
  }
}

export type getContactByIdResponseType = {
  id: string
  title: string
  name: string
  email: string
  userId: string
}
