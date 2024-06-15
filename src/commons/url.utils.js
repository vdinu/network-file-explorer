
// function that adds a path segment to path regardless if url ends with '/'
const addSegment = (path, pathSegment) => {
  return path.endsWith('/') ? path + pathSegment : path + '/' + pathSegment;
}

// function to remove path segment from path
const removeSegment = (path) => {
  const pathSegments = path.split('/');
  pathSegments.pop();
  return pathSegments.join('/');
}

const isRoot = (path) => {
  return path === '/' || path === '';
}

export { addSegment, removeSegment, isRoot };