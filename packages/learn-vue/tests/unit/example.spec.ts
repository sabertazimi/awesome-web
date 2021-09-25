import { shallowMount } from '@vue/test-utils';
import EventCard from '@/components/EventCard.vue';

describe('EventCard.vue', () => {
  it('renders event information when passed', () => {
    const event = {
      id: 5928101,
      title: 'Cat Adoption Day',
      date: 'January 28, 2022',
      time: '12:00',
      location: 'Meow Town',
      category: 'animal welfare',
      description: 'Find your new feline friend at this event.',
      organizer: 'Kat Laydee',
      petsAllowed: true,
    };
    const wrapper = shallowMount(EventCard, {
      props: { event },
    });
    expect(wrapper.text()).toMatch(event.title);
    expect(wrapper.text()).toMatch(event.date);
    expect(wrapper.text()).toMatch(event.time);
    expect(wrapper.text()).not.toMatch(event.id.toString());
    expect(wrapper.text()).not.toMatch(event.location);
    expect(wrapper.text()).not.toMatch(event.category);
    expect(wrapper.text()).not.toMatch(event.description);
    expect(wrapper.text()).not.toMatch(event.organizer);
    expect(wrapper.text()).not.toMatch(event.petsAllowed.toString());
  });
});
