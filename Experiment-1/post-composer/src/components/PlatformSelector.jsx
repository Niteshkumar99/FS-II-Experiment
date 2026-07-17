export default function PlatformSelector({
  platform,
  setPlatform,
}) {
  return (
    <select
      value={platform}
      onChange={(e) => setPlatform(e.target.value)}
    >
      <option>LinkedIn</option>
      <option>Twitter</option>
      <option>Instagram</option>
    </select>
  );
}