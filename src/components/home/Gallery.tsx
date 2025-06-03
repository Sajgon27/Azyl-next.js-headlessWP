import Image from 'next/image';

const imageColumns = [
  [
    "/images/galleryHome/1.jpeg",
    "/images/galleryHome/2.jpeg",
  ],
  [
    "/images/galleryHome/3.jpeg",
  ],
  [
    "/images/galleryHome/4.jpeg",
    "/images/galleryHome/1.jpeg",
  ],
  [
    "/images/galleryHome/3.jpeg",
  ],
  [
    "/images/galleryHome/5.jpeg",
    "/images/galleryHome/2.jpeg",
  ],
];

export default function Gallery ()  {
  return (
    <div className="px-4 mt-4 lg:mt-12 pb-4 ">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4" style={{ minHeight: 300 }}>
        {imageColumns.map((col, colIdx) => (
          <div
            key={colIdx}
            className={`flex flex-col h-full max-h-[800px] ${col.length === 1 ? 'justify-center' : 'gap-4'} ${colIdx === imageColumns.length - 1 ? 'sm:flex hidden' : ''}`}
          >
            {col.map((src, imgIdx) => (
              <div
                key={imgIdx}
                className={
                  col.length === 1
                    ? "flex-1 flex items-center h-full"
                    : "flex-1 flex items-center h-1/2 max-h-[300px]"
                }
              >
                <Image
                  className="h-full w-full object-cover rounded-lg"
                  src={src}
                  alt=""
                  fill={false}
                  width={400}
                  height={300}
                  style={{ minHeight: 0 }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

