import BackdropImage from '@/components/shared/backdrop_image/BackdropImage';
import TvSeriesDetails from '@/components/pages/details/tv_series/tv_series_details/TvSeriesDetails';
import { getTvSeriesById, getTvSeriesImagesById, getTvSeriesVideosById } from '@/lib/requests/tv_series';
import ScenesGrid from '@/components/pages/details/tv_series/scenes_grid/ScenesGrid';

interface iProps {
  params: {
    id: string;
  };
}

const TvSeriesPage = async ({ params }: iProps) => {
  const { id } = params;
  const tvSeries = await getTvSeriesById(id);
  const tvSeriesImages = await getTvSeriesImagesById(id);
  const tvSeriesVideos = await getTvSeriesVideosById(id);

  return (
    <div>
      <BackdropImage tvSeries={tvSeries} />
      <TvSeriesDetails tvSeries={tvSeries} tvSeriesVideos={tvSeriesVideos} />
      <ScenesGrid images={tvSeriesImages} tvSeries={tvSeries} />
    </div>
  );
};

export default TvSeriesPage;
