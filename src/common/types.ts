export interface Name {
  title: string
  first: string
  last: string
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export interface Person {
  id: number
  name: Name
  email: string
  picture: Picture
}

export interface PersonInput {
  title?: string
  first?: string
  last?: string
  email?: string
}