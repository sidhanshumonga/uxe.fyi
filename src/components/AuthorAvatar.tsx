// A contributor's GitHub avatar.
export function AuthorAvatar({ handle, size = 28 }: { handle: string; size?: number }) {
  return (
    <img
      className="author-av"
      src={`https://github.com/${handle}.png?size=${size * 2}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
