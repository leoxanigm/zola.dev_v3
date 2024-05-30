'use client';

export default function HoverVideo({
  youtubeVideoId
}: {
  youtubeVideoId: string;
}) {

  return (
    <div className='hover-video'>
      <iframe
        width='396'
        height='290'
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
    </div>
  );
}
