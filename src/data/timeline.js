// Timeline: May 2025 → February 2026
// Images are loaded from public/photos/ (update files there and they appear here).
// Always use BASE_URL so the same path works in dev (with vite.config) and on GitHub Pages.
const base = (typeof import.meta.env.BASE_URL === 'string' ? import.meta.env.BASE_URL : '/').replace(/([^/])$/, '$1/')

function photo(filename, caption) {
  return { src: base + 'photos/' + filename, caption }
}

export const timelineMonths = [
  {
    id: 'may-2025',
    label: 'May 2025',
    title: 'Our beginning',
    photos: [
      photo('may2025Photo.jpg', 'Got ready for our first date'),
      photo('may2025Photo2.jpg', 'Our first dine out (in front of putting arena)'),
      photo('may2025Photo3.jpg', 'Our first fun activity (putting)'),
      photo('may2025Photo4.jpg', 'Our first trip to Downtown'),
    ],
  },
  {
    id: 'jun-2025',
    label: 'June 2025',
    title: 'Summer starts',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('june2025Photo.jpg', 'One of our first few pictures 😁'),
      photo('june2025Photo2.jpg', 'First picture in the car 🚗'),
      photo('june2025Photo3.png', 'Goofing around with you 🥸'),
      photo('june2025Photo4.jpg', 'Our first visit to Guelph '),
      photo('june2025Photo5.jpg', 'Somewhere outside Vaughan Mills'),
    ],
  },
  {
    id: 'jul-2025',
    label: 'July 2025',
    title: 'Adventures',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('july2025Photo.jpg', 'Our first visit to a beach'),
      photo('july2025Photo2.jpg', 'Our first rainbow'),
      photo('july2025Photo3.jpg', 'Our first visit to the Gurudwara together'),
      photo('july2025Photo4.jpg', 'Our first photo at home'),
      photo('july2025Photo5.jpg', 'Random late night visit to the Lakeshore'),
      photo('july2025Photo6.jpg', 'Suar 🐷'),
      photo('july2025Photo7.jpg', 'Thanks for making my birthday special 🎂'),
      photo('july2025Photo8.jpg', 'When your permit did not extend ☹️'),
      photo('july2025Photo9.jpg', '👬'),
    ],
  },
  {
    id: 'aug-2025',
    label: 'August 2025',
    title: 'Warm days',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('august2025Photo.jpg', 'Trip to Blue Mountains'),
      photo('august2025Photo2.png', 'Tried to impress you 🎭'),
      photo('august2025Photo3.jpg', 'Always angry'),
      photo('august2025Photo4.jpg', 'Visit to Food Truck in Brampton'),
      photo('august2025Photo5.jpg', 'Felt like 👩‍❤️‍💋‍👨 during the trip to nowhere '),
    ],
  },
  {
    id: 'sep-2025',
    label: 'September 2025',
    title: 'New season',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('sept2025Photo.jpg', 'Our first concert together'),
      photo('sept2025Photo2.jpg', 'Second visit to the home'),
    ],
  },
  {
    id: 'oct-2025',
    label: 'October 2025',
    title: 'Fall memories',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('oct2025Photo.jpg', 'The day you said yes! 💍'),
      photo('oct2025Photo2.jpg', 'My princess with her ring'),
      photo('oct2025Photo3.jpg', 'Girl showing her skills 🎨'),
    ],
  },
  {
    id: 'nov-2025',
    label: 'November 2025',
    title: 'Cozy times',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('nov2025Photo.JPG', 'When we became official'),
      photo('nov2025Photo2.jpg', 'The day I became the luckiest man :)'),
      photo('nov2025Photo3.jpg', 'Another date with my cutie 😘'),
      photo('nov2025Photo4.jpg', 'My Pinocchio 🤥'),
      photo('nov2025Photo5.jpg', 'Wedding shopping started!!'),
    ],
  },
  {
    id: 'dec-2025',
    label: 'December 2025',
    title: 'Holidays',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('dec2025Photo.jpg', 'Flirting with air'),
      photo('dec2025Photo2.jpg', 'Being cute after making love'),
      photo('dec2025Photo3.jpg', 'Our first kiss in snowfall ❄️'),
      photo('dec2025Photo4.jpg', 'Built our first Christmas tree 🎄'),
      photo('dec2025Photo5.jpg', '8th Wonder of the World'),
      photo('dec2025Photo6.jpg', 'My Betaal Pachisi'),
    ],
  },
  {
    id: 'jan-2026',
    label: 'January 2026',
    title: 'New year',
    caption: 'Placeholder: add a caption for this month.',
    photos: [
      photo('jan2026Photo.jpg', 'Girl too shy for titanic pose'),
      photo('jan2026Photo2.jpg', 'Trying to undress me in public'),
      photo('jan2026Photo3.jpg', 'Meet Gunda'),
    ],
  },
  {
    id: 'feb-2026',
    label: 'February 2026',
    title: "Valentine's",
    caption: 'Our story continues…',
    photos: [
      photo('feb2026Photo.jpg', 'Showing her true colors'),
      photo('feb2026Photo2.jpg', 'Another date ൹'),
      photo('feb2026Photo3.jpg', 'Conjuring 5'),
    ],
    isLast: true,
  },
]
