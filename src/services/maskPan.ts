export const maskPan = (pan: string): string => {
  let masked = "";
  if (pan === undefined || pan === "") {
    return pan;
  } else {
    for (let index = 0; index < pan.length; index++) {
      const element = pan[index];
      if (index <= 6 && element !== " ") {
        masked += "X";
      } else {
        masked += element;
      }
    }
  }
  return masked;
};
