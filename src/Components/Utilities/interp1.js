export const interp1 = (xv, yv, xq) => {
  let i_initial = 1;
  let yq = [];
  xq.forEach(x => {
    let y = NaN;
    if(x >= xv[0] && x <= xv[xv.length-1]){
      for(let i = i_initial; i < xv.length; i++) {
        if(x > xv[i]) { continue; }
        let x0 = xv[i-1]; let x1 = xv[i];
        let y0 = yv[i-1]; let y1 = yv[i];
        y = linear(x, x0, x1, y0, y1);
        if(i === 1) { i_initial = 1; } else { i_initial = i - 1; }
        break;
      }
    }
    yq.push(y); //console.log("("+x+","+y+")");
  });
  return yq;
}

const linear = (x, x0, x1, y0, y1) => {
  if((x1 - x0) === 0) {
    // We use this instead of "(y0 + y1) / 2" as it may throw an overflow exception if y0, y1 are large.
    return (y0 + ((y1 - y0) / 2));
  }
  return (y0 + (x - x0) * (y1 - y0) / (x1 - x0));
}