'use client';

import photosGet, { Photo } from '@/actions/photos-get';
import FeedPhotos from './feed-photos';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/components/Helper/loading';
import styles from './feed.module.scss';

export default function Feed({
  photos,
  user,
}: {
  photos: Photo[];
  user?: 0 | string;
}) {
  const [photosFeed, setPhotosFeed] = useState<Photo[]>(photos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetching = useRef(false);
  const [infinite, setInfinite] = useState(photos.length < 6 ? false : true);

  function inifiniteScroll() {
    console.log('triggered');
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (page === 1) return;
    async function getPagePhotos(page: number) {
      const actionData = await photosGet(
        { page, total: 6, user: 0 },
        {
          cache: 'no-store',
        },
      );
      if (actionData && actionData.data !== null) {
        const { data } = actionData;
        setPhotosFeed((currentPhotos) => [...currentPhotos, ...data]);
        if (data.length < 6) setInfinite(false);
      }
    }
    getPagePhotos(page);
  }, [page]);

  useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', inifiniteScroll);
      window.addEventListener('wheel', inifiniteScroll);
    } else {
      window.removeEventListener('scroll', inifiniteScroll);
      window.removeEventListener('wheel', inifiniteScroll);
    }
    return () => {
      window.removeEventListener('scroll', inifiniteScroll);
      window.removeEventListener('wheel', inifiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {infinite ? loading && <Loading /> : <p>There are no more posts.</p>}
      </div>
    </div>
  );
}
