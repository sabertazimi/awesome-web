interface Event {
  id: number
  uid: number
  title: string
  date: string
  time: string
  location?: string
  category?: string
  description?: string
  organizer?: string
  petsAllowed?: boolean
}

const url = 'https://my-json-server.typicode.com/sabertazimi/awesome-web/events'

const getEvent = async (id: number): Promise<Event> => {
  const data = await fetch(`${url}/${id}`)
  return await data.json()
}

const getEvents = async (): Promise<Event[]> => {
  const data = await fetch(url)
  return await data.json()
}

export { getEvent, getEvents }
export type { Event }
