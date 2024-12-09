const TMDB_API_KEY = '3e96dde95504d1869608527d9979dce8';
const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTk2ZGRlOTU1MDRkMTg2OTYwODUyN2Q5OTc5ZGNlOCIsIm5iZiI6MTczMDc3Mjg1MS4zODQsInN1YiI6IjY3Mjk3ZjczMDZkYzg4NTk2MzIzZmEzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qec9DYUWXONCmhdoG5zguW14ByLeZjJNYzcWZH5KXbU';

const headers = {
  'Authorization': `Bearer ${BEARER_TOKEN}`,
  'accept': 'application/json'
};

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  origin_country: string[];
}

export const fetchMovies = async (params: {
  industry?: string;
  year?: string;
  genre?: string;
  contentRating?: string;
}) => {
  const { industry, year, genre, contentRating } = params;
  
  let url = `${BASE_URL}/discover/movie?language=en-US`;
  
  if (year) url += `&primary_release_year=${year}`;
  if (genre) url += `&with_genres=${genre}`;
  if (contentRating) url += `&certification=${contentRating}`;
  if (industry) {
    const regionMap: { [key: string]: string } = {
      Hollywood: 'US',
      Bollywood: 'IN',
      Korean: 'KR',
      Japanese: 'JP',
    };
    url += `&region=${regionMap[industry]}`;
  }

  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.results.slice(0, 3);
};

export const fetchTVShows = async (params: {
  industry?: string;
  year?: string;
  genre?: string;
}) => {
  const { industry, year, genre } = params;
  
  let url = `${BASE_URL}/discover/tv?language=en-US`;
  
  if (year) url += `&first_air_date_year=${year}`;
  if (genre) url += `&with_genres=${genre}`;
  if (industry) {
    const regionMap: { [key: string]: string } = {
      Hollywood: 'US',
      Bollywood: 'IN',
      Korean: 'KR',
      Japanese: 'JP',
    };
    url += `&origin_country=${regionMap[industry]}`;
  }

  const response = await fetch(url, { headers });
  const data = await response.json();
  return data.results.slice(0, 3);
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=en-US`,
    { headers }
  );
  return response.json();
};

export const fetchTVShowDetails = async (id: number): Promise<TVShow> => {
  const response = await fetch(
    `${BASE_URL}/tv/${id}?language=en-US`,
    { headers }
  );
  return response.json();
};

export const fetchTrending = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?language=en-US`,
    { headers }
  );
  const data = await response.json();
  return data.results;
};

export const fetchPopular = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US`,
    { headers }
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieTrailer = async (id: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?language=en-US`,
    { headers }
  );
  const data = await response.json();
  return data.results.find((video: any) => video.type === 'Trailer');
};