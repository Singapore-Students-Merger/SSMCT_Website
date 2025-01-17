import GalleryPage from './GalleryPage';
import { Info } from '@/components/Gallery';
import { fetchGalleryData } from '@/app/api/images/route';

const GalleryPageServer = async () => {
  const data: Info[] = await fetchGalleryData();

  return <GalleryPage data={data} />;
};

export default GalleryPageServer;
