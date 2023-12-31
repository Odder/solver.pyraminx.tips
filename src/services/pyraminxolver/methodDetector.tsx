import { Graph, Properties } from './pyraminx'

const detect = (pyra: any, state: number, path: Array<number>) => {
  const vFirst = (): Boolean => {
    return path.slice(0, 5).some(s => pyra.hasProperty(s, Properties.hasV));
  }

  const topFirst = (): Boolean => {
    return path.slice(0, 7).some(s => pyra.hasProperty(s, Properties.hasTop));
  }

  const layerByLayer = (): Boolean => {
    return path.slice(0, 7).some(s => pyra.hasProperty(s, Properties.hasLayer));
  }

  const methods: Array<[string, () => Boolean]> = [
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