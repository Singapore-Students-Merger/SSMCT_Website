import GalleryPage from './GalleryPage';
import { Info } from '@/components/Gallery';
import getGalleryData from '@/utils/getGalleryData';

const GalleryPageServer = async () => {
  const data: Info[] = await getGalleryData();

  return <GalleryPage data={data} />;
};
export const revalidate = 3600;
export default GalleryPageServer;
