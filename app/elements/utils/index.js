export function capitalizer(text = '') {
  const nameSplited = text.split("");
  const letter = nameSplited.splice(0,1)[0]?.toUpperCase();
  nameSplited.splice(0,0,letter);  
  return nameSplited.join("");
}