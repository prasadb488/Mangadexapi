export  function trim(paraagraph, wordcount) {
  if (paraagraph !== undefined && paraagraph.length < wordcount) {
    return paraagraph;
  }
  return paraagraph !== undefined&& paraagraph.substring(0, wordcount) + "...";
}
export function trimfollowers(num){
    const format = (num/10000).toFixed(1);
    return `${format}k`
}
