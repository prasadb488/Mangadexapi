export default function trim(paraagraph, wordcount) {
  if (paraagraph !== undefined && paraagraph.length < wordcount) {
    return paraagraph;
  }
  return paraagraph !== undefined&& paraagraph.substring(0, wordcount) + "...";
}
