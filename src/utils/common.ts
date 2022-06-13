export function addOrDelete<Value>(arr: Value[], value: Value): Value[] {
  if (arr.includes(value)) {
    return arr.filter((item) => item !== value);
  }

  return arr.concat([value]);
}

export function formatSongLength(length: number): string {
  const minutes = Math.floor(length / 60);
  const seconds = Math.floor(length - minutes * 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
