import React from 'react';

type VideoProps = {
  src: string
  width: number
  height: number
  type: VideoType
}

export enum VideoType {
  Mov = 'mp4',
  Mp4 = 'mp4',
  Webm = 'webm',
}

const Video: React.FC<VideoProps> = ({ src, width, height, type }) => {
  return (
    <div className="w-full p-8 flex justify-center dark:bg-zinc-900 bg-zinc-50">
      <video className="rounded-[1.25rem] overflow-hidden" controls={false} playsInline autoPlay muted loop width={width} height={height}>
        <source src={src} type={`video/${type}`} />
      </video>
    </div>
  );
};

export default Video;