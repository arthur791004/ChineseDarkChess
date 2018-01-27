export default function shuffle(array) {
  const results = array.slice();
  const size = results.length;

  for (let i = 0; i < size; i++) {
    const target = Math.floor(Math.random() * size);
    const tmp = results[i];

    results[i] = results[target];
    results[target] = tmp;
  }

  return results;
}