function getTopicLevelFromPath(path: string): { topic: string | null; level: string | null } {
  const regex = /\/topics\/(\w+)\/(\w+)/;
  const groups = path.match(regex);

  return {
    topic: (groups && groups[1]) || null,
    level: (groups && groups[2]) || null,
  };
}

export default getTopicLevelFromPath;
