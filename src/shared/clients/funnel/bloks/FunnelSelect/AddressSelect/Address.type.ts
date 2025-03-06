export default interface Address {
  id: string
  housenumber?: string
  type: string
  street: string
  label: string
  name: string
  city: string
  citycode?: string
  postcode: string
  lon?: number
  lat?: number
  result?: any
}
