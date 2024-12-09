'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { fetchMovieDetails, fetchMovieTrailer, fetchTVShowDetails } from '@/lib/tmdb';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { Clock, Star, Calendar } from 'lucide-react';

interface MediaDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mediaId: number;
  type: 'movie' | 'tv';
}

export function MediaDetailsDialog({
  open,
  onOpenChange,
  mediaId,
  type,
}: MediaDetailsDialogProps) {
  const [details, setDetails] = useState<any>(null);
  const [trailer, setTrailer] = useState<any>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (open && mediaId) {
      const fetchDetails = async () => {
        try {
          const data =
            type === 'movie'
              ? await fetchMovieDetails(mediaId)
              : await fetchTVShowDetails(mediaId);
          setDetails(data);

          if (type === 'movie') {
            const trailerData = await fetchMovieTrailer(mediaId);
            setTrailer(trailerData);
          }
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      };

      fetchDetails();
    } else {
      setShowTrailer(false);
    }
  }, [open, mediaId, type]);

  if (!details) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{type === 'movie' ? details.title : details.name}</DialogTitle>
          <DialogDescription>
            {new Date(
              type === 'movie' ? details.release_date : details.first_air_date
            ).getFullYear()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[2/3]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={type === 'movie' ? details.title : details.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{details.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {type === 'movie'
                    ? `${details.runtime} min`
                    : `${details.episode_run_time?.[0] || 'N/A'} min/ep`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(
                    type === 'movie' ? details.release_date : details.first_air_date
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <p>{details.overview}</p>

            <div>
              <h4 className="font-semibold mb-2">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {details.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {trailer && (
              <Button
                onClick={() => setShowTrailer(!showTrailer)}
                className="w-full"
              >
                {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
              </Button>
            )}
          </div>
        </div>

        {showTrailer && trailer && (
          <div className="mt-6">
            <Separator className="mb-6" />
            <div className="relative aspect-video">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                width="100%"
                height="100%"
                controls
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}