export const getLabel = (fieldName: string) => {
  const fieldNameRes = fieldName.includes('_') ? fieldName.replace('_', ' ') : fieldName;
  return fieldNameRes.charAt(0).toUpperCase() + fieldNameRes.slice(1);
};
