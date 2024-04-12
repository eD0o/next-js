'use client';

import { PhotoData } from '@/actions/photo-get';
import PhotoContent from '../Photo/photo-content';
import styles from './feed-modal.module.scss';
import { usePathname, useRouter } from 'next/navigation';

export default function FeedModal({ photo }: { photo: PhotoData }) {
  const router = useRouter();
  const pathname = usePathname();

  if (!pathname.includes('photo')) {
    return null;
  }

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <PhotoContent data={photo} single={false} />;
    </div>
  );
}
