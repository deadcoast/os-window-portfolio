export function Carousel3D() {
  const images = [
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-200e5f7a-df88-4579-8075-9f5326692228',
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-f3d2006b-680c-47c4-96d8-79edf26c9769',
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-ac020dde-b4a6-49b0-85a8-f2eeb0e08543',
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-babd63a5-9597-4ad5-a1c4-0384e7553fb0',
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-924b2c8b-6cf8-453f-8e70-022808e7df32',
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-11bb4184-abb5-4beb-bc4d-230cd8d2a6d9',
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-8ed7672c-c438-481c-a80f-7db0ac03c41d',
    'https://www.deadcoast.net/art-gallery?pgid=m2z6zp584-200e5f7a-df88-4579-8075-9f5326692228'
  ];

  return (
    <div className="carousel-3d-container">
      <div className="carousel-3d-inner">
        {images.map((img, index) => (
          <div key={index} className="carousel-3d-card" style={{ '--index': index } as React.CSSProperties}>
            <img src={img} alt={`Artwork ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
