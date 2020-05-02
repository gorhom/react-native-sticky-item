const arcParameter = (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) =>
  [
    rx,
    ',',
    ry,
    ' ',
    xAxisRotation,
    ' ',
    largeArcFlag,
    ',',
    sweepFlag,
    ' ',
    x,
    ',',
    y,
  ].join('');

// @ts-ignore
export const generatePathData = ({ x, y, width, height, tr, br, bl, tl }) => {
  var data = [];
  data.push('M' + (x + width / 2) + ',' + y);
  data.push('H' + (x + width - tr));

  if (tr > 0) {
    data.push('A' + arcParameter(tr, tr, 0, 0, 1, x + width, y + tr));
  }
  data.push('V' + (y + height - br));

  if (br > 0) {
    data.push('A' + arcParameter(br, br, 0, 0, 1, x + width - br, y + height));
  }
  data.push('H' + (x + bl));
  if (bl > 0) {
    data.push('A' + arcParameter(bl, bl, 0, 0, 1, x + 0, y + height - bl));
  }

  data.push('V' + (y + tl));

  if (tl > 0) {
    data.push('A' + arcParameter(tl, tl, 0, 0, 1, x + tl, y + 0));
  }
  data.push('Z');
  return data.join(' ');
};
