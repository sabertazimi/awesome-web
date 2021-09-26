interface Event {
  id: number;
  uid: number;
  title: string;
  date: string;
  time: string;
  location?: string;
  category?: string;
  description?: string;
  organizer?: string;
  petsAllowed?: boolean;
}

const url =
  'https://my-json-server.typicode.com/sabertazimi/awesome-web/events';

const getEvents = async (): Promise<Event[]> => {
  const data = await fetch(url);
  return await data.json();
};

export { getEvents };
export type { Event };
