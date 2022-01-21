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
    <div className="w-full p-12 flex justify-center dark:bg-gray-900 bg-gray-50">
      <video className="rounded-[2.25rem] overflow-hidden" autoPlay muted loop width={width} height={height}>
        <source src={src} type={`video/${type}`} />
      </video>
    </div>
  );
};

export default Video;