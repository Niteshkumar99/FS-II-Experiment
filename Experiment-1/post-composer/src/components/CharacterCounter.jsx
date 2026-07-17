export default function CharacterCounter({
  current,
  limit,
}) {
  return (
    <h4>
      {current} / {limit}
    </h4>
  );
}