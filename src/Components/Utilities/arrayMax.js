export const arrayMax = (arr) => {
  let arrMax = arr[0];

  for(let i = 1; i < arr.length; i++) {
    if(arr[i] > arrMax) {
      arrMax = arr[i];
    }
  }

  return arrMax;
}