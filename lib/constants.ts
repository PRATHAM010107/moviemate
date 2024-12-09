export const INDUSTRIES = [
  { value: 'Hollywood', label: 'Hollywood' },
  { value: 'Bollywood', label: 'Bollywood' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Japanese', label: 'Japanese' },
];

export const GENRES = [
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

export const CONTENT_RATINGS = [
  { value: 'G', label: 'All Ages' },
  { value: 'PG', label: 'Parental Guidance' },
  { value: 'PG-13', label: '13+' },
  { value: 'R', label: 'Adult' },
];

export const YEARS = Array.from({ length: 74 }, (_, i) => {
  const year = 2024 - i;
  return { value: year.toString(), label: year.toString() };
});