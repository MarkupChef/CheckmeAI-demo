export const convertGoogleDriveLinkToViewLink = (link: string): string => {
  const linkArr = link.split('/');
  const fileId = linkArr[5];

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

export default convertGoogleDriveLinkToViewLink;
