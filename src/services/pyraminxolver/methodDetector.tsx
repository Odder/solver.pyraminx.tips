import { Graph, Properties } from './pyraminx'

const detect = (pyra: any, state: number, path: Array<number>) => {
  const vFirst = (): Boolean => {
    return path.slice(0, Math.min(5, path.length - 2)).some(s => pyra.hasProperty(s, Properties.hasV));
  }

  const topFirst = (): Boolean => {
    return path.slice(0, Math.min(7, path.length - 2)).some(s => pyra.hasProperty(s, Properties.hasTop));
  }

  const oneFlip = (): Boolean => {
    return path.slice(0, 4).some(s => pyra.hasProperty(s, Properties.hasOneFlip));
  }

  const layerByLayer = (): Boolean => {
    return path.slice(0, Math.min(7, path.length - 2)).some(s => pyra.hasProperty(s, Properties.hasLayer));
  }

  const methods: Array<[string, () => Boolean]> = [
    ['One-flip', oneFlip],
    ['Top First', topFirst],
    ['V First', vFirst],
    ['LBL', layerByLayer],
  ];

  // iterate over methods and return the first one that returns true
  for (const [name, detector] of methods) {
    if (detector()) {
      return name;
    }
  }

  return false;
}

export default detect;