// Cover band at the top of a reviewed resource card (decorative: the card
// already names the resource, so alt is empty).
export function CardCover({ src, book }: { src: string; title: string; book: boolean }) {
  return (
    <div className={'card-cover' + (book ? ' book' : '')}>
      <img src={src} alt="" loading="lazy" />
    </div>
  );
}
