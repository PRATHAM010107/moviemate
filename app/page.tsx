'use client';

import { useState } from 'react';
import { RecommendationForm } from '@/components/recommendation-form';
import { MediaCard } from '@/components/media-card';
import { fetchMovies, fetchTVShows } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: {
    industry: string;
    year: string;
    genre: string;
    contentRating: string;
  }) => {
    setIsLoading(true);
    try {
      const [movieResults, tvResults] = await Promise.all([
        fetchMovies(values),
        fetchTVShows(values),
      ]);
      setMovies(movieResults);
      setTvShows(tvResults);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    handleSubmit({
      industry: '',
      year: '',
      genre: '',
      contentRating: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Find Your Next Watch</h1>
        <p className="text-muted-foreground">
          Get personalized movie and TV show recommendations based on your preferences
        </p>
      </div>

      <RecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />

      {(movies.length > 0 || tvShows.length > 0) && (
        <div className="space-y-8">
          {movies.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Movie Recommendations</h2>
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map((movie) => (
                  <MediaCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                    posterPath={movie.poster_path}
                    releaseDate={movie.release_date}
                    rating={movie.vote_average}
                    type="movie"
                  />
                ))}
              </div>
            </section>
          )}

          {tvShows.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">TV Show Recommendations</h2>
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tvShows.map((show) => (
                  <MediaCard
                    key={show.id}
                    id={show.id}
                    title={show.name}
                    overview={show.overview}
                    posterPath={show.poster_path}
                    releaseDate={show.first_air_date}
                    rating={show.vote_average}
                    type="tv"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}