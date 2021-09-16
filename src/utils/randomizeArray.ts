export function randomizeArray(arr: string[], num: number) {
  let newArray = arr.slice();
  let ret: string[] = [];

  while (ret.length < num) {
    let rnd = Math.floor(Math.random() * newArray.length);
    ret.push(newArray[rnd]);
    newArray[rnd] = "";
    newArray = newArray.filter((a) => {
      return a;
    });
  }
  return ret;
}
