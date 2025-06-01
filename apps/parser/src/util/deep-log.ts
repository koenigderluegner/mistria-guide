import util from 'util';

export function deepLog(obj: any) {
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true })
  );
}
