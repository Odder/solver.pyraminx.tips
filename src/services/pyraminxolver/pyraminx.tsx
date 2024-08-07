import pyraminxolver from "./pyraminxolver";
// import BigGraph from "./graph";

const permutator = (inputArr: any) => {
  let result: any[] = [];

  const permute = (arr: any[], m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next: any = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result;
}

function product(iterables: any, repeat: number) {
  var argv = Array.prototype.slice.call([iterables, repeat]), argc = argv.length;
  if (argc === 2 && !isNaN(argv[argc - 1])) {
    var copies = [];
    for (var i = 0; i < argv[argc - 1]; i++) {
      copies.push(argv[0].slice()); // Clone
    }
    argv = copies;
  }
  return argv.reduce(function tl(accumulator, value) {
    var tmp: any[] = [];
    accumulator.forEach(function (a0: any) {
      value.forEach(function (a1: any) {
        tmp.push(a0.concat(a1));
      });
    });
    return tmp;
  }, [[]]);
}


const Pyraminx = () => {
  const ep: number[][] = [];
  const eo: number[][] = [];
  const co: number[][] = [];

  const epDict: { [key: string]: number; } = {};
  const eoDict: { [key: string]: number; } = {};
  const coDict: { [key: string]: number; } = {};

  const epTable: number[][] = [[120, 72, 39, 28, 10, 7, 197, 315], [121, 73, 51, 41, 4, 11, 256, 195], [122, 74, 27, 52, 8, 5, 317, 255], [180, 84, 54, 17, 6, 9, 136, 258], [181, 85, 15, 43, 11, 1, 260, 318], [182, 86, 42, 56, 2, 8, 319, 135], [240, 96, 30, 19, 9, 3, 140, 321], [241, 97, 57, 32, 0, 10, 199, 138], [242, 98, 18, 58, 5, 2, 323, 198], [300, 108, 45, 23, 3, 6, 142, 201], [301, 109, 21, 34, 7, 0, 203, 261], [302, 110, 33, 47, 1, 4, 262, 141], [60, 132, 48, 26, 19, 22, 208, 267], [61, 133, 24, 37, 23, 16, 269, 327], [62, 134, 36, 50, 17, 20, 328, 207], [183, 144, 43, 4, 21, 18, 77, 330], [184, 145, 55, 44, 13, 23, 271, 75], [185, 146, 3, 54, 20, 14, 332, 270], [243, 156, 58, 8, 15, 21, 79, 210], [244, 157, 6, 30, 22, 12, 212, 333], [245, 158, 31, 59, 14, 17, 334, 78], [303, 168, 34, 10, 18, 15, 83, 273], [304, 169, 46, 35, 12, 19, 214, 81], [305, 170, 9, 45, 16, 13, 275, 213], [63, 192, 37, 13, 34, 31, 149, 339], [64, 193, 49, 38, 28, 35, 280, 147], [65, 194, 12, 48, 32, 29, 341, 279], [123, 204, 52, 2, 30, 33, 88, 282], [124, 205, 0, 39, 35, 25, 284, 342], [125, 206, 40, 53, 26, 32, 343, 87], [246, 216, 19, 6, 33, 27, 92, 345], [247, 217, 59, 20, 24, 34, 151, 90], [248, 218, 7, 57, 29, 26, 347, 150], [306, 228, 47, 11, 27, 30, 94, 153], [307, 229, 10, 21, 31, 24, 155, 285], [308, 230, 22, 46, 25, 28, 286, 93], [66, 252, 50, 14, 43, 46, 160, 219], [67, 253, 13, 24, 47, 40, 221, 351], [68, 254, 25, 49, 41, 44, 352, 159], [126, 264, 28, 0, 45, 42, 101, 354], [127, 265, 53, 29, 37, 47, 223, 99], [128, 266, 1, 51, 44, 38, 356, 222], [186, 276, 56, 5, 39, 45, 103, 162], [187, 277, 4, 15, 46, 36, 164, 357], [188, 278, 16, 55, 38, 41, 358, 102], [309, 288, 23, 9, 42, 39, 107, 225], [310, 289, 35, 22, 36, 43, 166, 105], [311, 290, 11, 33, 40, 37, 227, 165], [69, 312, 26, 12, 58, 55, 173, 291], [70, 313, 38, 25, 52, 59, 232, 171], [71, 314, 14, 36, 56, 53, 293, 231], [129, 324, 41, 1, 54, 57, 112, 234], [130, 325, 2, 27, 59, 49, 236, 294], [131, 326, 29, 40, 50, 56, 295, 111], [189, 336, 17, 3, 57, 51, 116, 297], [190, 337, 44, 16, 48, 58, 175, 114], [191, 338, 5, 42, 53, 50, 299, 174], [249, 348, 32, 7, 51, 54, 118, 177], [250, 349, 8, 18, 55, 48, 179, 237], [251, 350, 20, 31, 49, 52, 238, 117], [132, 12, 111, 89, 67, 70, 184, 243], [133, 13, 87, 100, 71, 64, 245, 303], [134, 14, 99, 113, 65, 68, 304, 183], [192, 24, 102, 76, 69, 66, 125, 306], [193, 25, 114, 104, 61, 71, 247, 123], [194, 26, 75, 115, 68, 62, 308, 246], [252, 36, 117, 80, 63, 69, 127, 186], [253, 37, 78, 91, 70, 60, 188, 309], [254, 38, 90, 119, 62, 65, 310, 126], [312, 48, 93, 82, 66, 63, 131, 249], [313, 49, 105, 95, 60, 67, 190, 129], [314, 50, 81, 106, 64, 61, 251, 189], [0, 120, 96, 85, 82, 79, 206, 324], [1, 121, 108, 98, 76, 83, 265, 204], [2, 122, 84, 109, 80, 77, 326, 264], [195, 147, 115, 65, 78, 81, 16, 271], [196, 148, 63, 102, 83, 73, 272, 331], [197, 149, 103, 116, 74, 80, 330, 15], [255, 159, 91, 67, 81, 75, 20, 334], [256, 160, 118, 92, 72, 82, 210, 18], [257, 161, 66, 117, 77, 74, 335, 211], [315, 171, 106, 71, 75, 78, 22, 214], [316, 172, 69, 93, 79, 72, 215, 274], [317, 173, 94, 107, 73, 76, 273, 21], [3, 180, 109, 74, 91, 94, 145, 276], [4, 181, 72, 96, 95, 88, 278, 336], [5, 182, 97, 110, 89, 92, 337, 144], [135, 207, 100, 61, 93, 90, 29, 343], [136, 208, 112, 101, 85, 95, 282, 27], [137, 209, 60, 111, 92, 86, 344, 283], [258, 219, 119, 68, 87, 93, 31, 151], [259, 220, 67, 78, 94, 84, 152, 346], [260, 221, 79, 118, 86, 89, 345, 30], [318, 231, 82, 69, 90, 87, 35, 286], [319, 232, 107, 83, 84, 91, 153, 33], [320, 233, 70, 105, 88, 85, 287, 154], [6, 240, 85, 72, 106, 103, 158, 348], [7, 241, 110, 86, 100, 107, 217, 156], [8, 242, 73, 108, 104, 101, 350, 216], [138, 267, 113, 62, 102, 105, 40, 223], [139, 268, 61, 87, 107, 97, 224, 355], [140, 269, 88, 112, 98, 104, 354, 39], [198, 279, 76, 63, 105, 99, 44, 358], [199, 280, 116, 77, 96, 106, 162, 42], [200, 281, 64, 114, 101, 98, 359, 163], [321, 291, 95, 70, 99, 102, 46, 166], [322, 292, 71, 81, 103, 96, 167, 226], [323, 293, 83, 94, 97, 100, 225, 45], [9, 300, 98, 73, 115, 118, 169, 228], [10, 301, 74, 84, 119, 112, 230, 288], [11, 302, 86, 97, 113, 116, 289, 168], [141, 327, 89, 60, 117, 114, 53, 295], [142, 328, 101, 88, 109, 119, 234, 51], [143, 329, 62, 99, 116, 110, 296, 235], [201, 339, 104, 64, 111, 117, 55, 175], [202, 340, 65, 75, 118, 108, 176, 298], [203, 341, 77, 103, 110, 113, 297, 54], [261, 351, 80, 66, 114, 111, 59, 238], [262, 352, 92, 79, 108, 115, 177, 57], [263, 353, 68, 90, 112, 109, 239, 178], [72, 0, 159, 148, 130, 127, 182, 300], [73, 1, 171, 161, 124, 131, 241, 180], [74, 2, 147, 172, 128, 125, 302, 240], [204, 27, 174, 137, 126, 129, 64, 247], [205, 28, 135, 163, 131, 121, 248, 307], [206, 29, 162, 176, 122, 128, 306, 63], [264, 39, 150, 139, 129, 123, 68, 310], [265, 40, 177, 152, 120, 130, 186, 66], [266, 41, 138, 178, 125, 122, 311, 187], [324, 51, 165, 143, 123, 126, 70, 190], [325, 52, 141, 154, 127, 120, 191, 250], [326, 53, 153, 167, 121, 124, 249, 69], [12, 60, 168, 146, 139, 142, 193, 252], [13, 61, 144, 157, 143, 136, 254, 312], [14, 62, 156, 170, 137, 140, 313, 192], [207, 87, 163, 124, 141, 138, 5, 319], [208, 88, 175, 164, 133, 143, 258, 3], [209, 89, 123, 174, 140, 134, 320, 259], [267, 99, 178, 128, 135, 141, 7, 199], [268, 100, 126, 150, 142, 132, 200, 322], [269, 101, 151, 179, 134, 137, 321, 6], [327, 111, 154, 130, 138, 135, 11, 262], [328, 112, 166, 155, 132, 139, 201, 9], [329, 113, 129, 165, 136, 133, 263, 202], [15, 183, 157, 133, 154, 151, 86, 337], [16, 184, 169, 158, 148, 155, 276, 84], [17, 185, 132, 168, 152, 149, 338, 277], [75, 195, 172, 122, 150, 153, 25, 280], [76, 196, 120, 159, 155, 145, 281, 340], [77, 197, 160, 173, 146, 152, 339, 24], [270, 222, 139, 126, 153, 147, 32, 347], [271, 223, 179, 140, 144, 154, 90, 31], [272, 224, 127, 177, 149, 146, 346, 91], [330, 234, 167, 131, 147, 150, 33, 94], [331, 235, 130, 141, 151, 144, 95, 287], [332, 236, 142, 166, 145, 148, 285, 34], [18, 243, 170, 134, 163, 166, 97, 217], [19, 244, 133, 144, 167, 160, 218, 349], [20, 245, 145, 169, 161, 164, 348, 96], [78, 255, 148, 120, 165, 162, 38, 352], [79, 256, 173, 149, 157, 167, 219, 36], [80, 257, 121, 171, 164, 158, 353, 220], [210, 282, 176, 125, 159, 165, 42, 103], [211, 283, 124, 135, 166, 156, 104, 359], [212, 284, 136, 175, 158, 161, 357, 43], [333, 294, 143, 129, 162, 159, 47, 227], [334, 295, 155, 142, 156, 163, 105, 46], [335, 296, 131, 153, 160, 157, 226, 106], [21, 303, 146, 132, 178, 175, 110, 289], [22, 304, 158, 145, 172, 179, 228, 108], [23, 305, 134, 156, 176, 173, 290, 229], [81, 315, 161, 121, 174, 177, 49, 232], [82, 316, 122, 147, 179, 169, 233, 292], [83, 317, 149, 160, 170, 176, 291, 48], [213, 342, 137, 123, 177, 171, 56, 299], [214, 343, 164, 136, 168, 178, 114, 55], [215, 344, 125, 162, 173, 170, 298, 115], [273, 354, 152, 127, 171, 174, 57, 118], [274, 355, 128, 138, 175, 168, 119, 239], [275, 356, 140, 151, 169, 172, 237, 58], [84, 3, 231, 209, 187, 190, 121, 241], [85, 4, 207, 220, 191, 184, 242, 301], [86, 5, 219, 233, 185, 188, 300, 120], [144, 15, 222, 196, 189, 186, 62, 304], [145, 16, 234, 224, 181, 191, 243, 60], [146, 17, 195, 235, 188, 182, 305, 244], [276, 42, 237, 200, 183, 189, 66, 127], [277, 43, 198, 211, 190, 180, 128, 311], [278, 44, 210, 239, 182, 185, 309, 67], [336, 54, 213, 202, 186, 183, 71, 251], [337, 55, 225, 215, 180, 187, 129, 70], [338, 56, 201, 226, 184, 181, 250, 130], [24, 63, 216, 205, 202, 199, 134, 313], [25, 64, 228, 218, 196, 203, 252, 132], [26, 65, 204, 229, 200, 197, 314, 253], [147, 75, 235, 185, 198, 201, 1, 256], [148, 76, 183, 222, 203, 193, 257, 316], [149, 77, 223, 236, 194, 200, 315, 0], [279, 102, 211, 187, 201, 195, 8, 323], [280, 103, 238, 212, 192, 202, 138, 7], [281, 104, 186, 237, 197, 194, 322, 139], [339, 114, 226, 191, 195, 198, 9, 142], [340, 115, 189, 213, 199, 192, 143, 263], [341, 116, 214, 227, 193, 196, 261, 10], [27, 123, 229, 194, 211, 214, 73, 265], [28, 124, 192, 216, 215, 208, 266, 325], [29, 125, 217, 230, 209, 212, 324, 72], [87, 135, 220, 181, 213, 210, 14, 328], [88, 136, 232, 221, 205, 215, 267, 12], [89, 137, 180, 231, 212, 206, 329, 268], [282, 162, 239, 188, 207, 213, 18, 79], [283, 163, 187, 198, 214, 204, 80, 335], [284, 164, 199, 238, 206, 209, 333, 19], [342, 174, 202, 189, 210, 207, 23, 275], [343, 175, 227, 203, 204, 211, 81, 22], [344, 176, 190, 225, 208, 205, 274, 82], [30, 246, 205, 192, 226, 223, 98, 350], [31, 247, 230, 206, 220, 227, 156, 97], [32, 248, 193, 228, 224, 221, 349, 157], [90, 258, 233, 182, 222, 225, 36, 160], [91, 259, 181, 207, 227, 217, 161, 353], [92, 260, 208, 232, 218, 224, 351, 37], [150, 270, 196, 183, 225, 219, 41, 356], [151, 271, 236, 197, 216, 226, 99, 40], [152, 272, 184, 234, 221, 218, 355, 100], [345, 297, 215, 190, 219, 222, 45, 107], [346, 298, 191, 201, 223, 216, 106, 167], [347, 299, 203, 214, 217, 220, 165, 47], [33, 306, 218, 193, 235, 238, 108, 169], [34, 307, 194, 204, 239, 232, 170, 290], [35, 308, 206, 217, 233, 236, 288, 109], [93, 318, 209, 180, 237, 234, 50, 293], [94, 319, 221, 208, 229, 239, 171, 49], [95, 320, 182, 219, 236, 230, 292, 172], [153, 330, 224, 184, 231, 237, 51, 112], [154, 331, 185, 195, 238, 228, 113, 296], [155, 332, 197, 223, 230, 233, 294, 52], [285, 357, 200, 186, 234, 231, 58, 179], [286, 358, 212, 199, 228, 235, 117, 59], [287, 359, 188, 210, 232, 229, 178, 119], [96, 6, 279, 268, 250, 247, 122, 302], [97, 7, 291, 281, 244, 251, 180, 121], [98, 8, 267, 292, 248, 245, 301, 181], [156, 18, 294, 257, 246, 249, 60, 184], [157, 19, 255, 283, 251, 241, 185, 305], [158, 20, 282, 296, 242, 248, 303, 61], [216, 30, 270, 259, 249, 243, 65, 308], [217, 31, 297, 272, 240, 250, 123, 64], [218, 32, 258, 298, 245, 242, 307, 124], [348, 57, 285, 263, 243, 246, 69, 131], [349, 58, 261, 274, 247, 240, 130, 191], [350, 59, 273, 287, 241, 244, 189, 71], [36, 66, 288, 266, 259, 262, 132, 193], [37, 67, 264, 277, 263, 256, 194, 314], [38, 68, 276, 290, 257, 260, 312, 133], [159, 78, 283, 244, 261, 258, 2, 317], [160, 79, 295, 284, 253, 263, 195, 1], [161, 80, 243, 294, 260, 254, 316, 196], [219, 90, 298, 248, 255, 261, 3, 136], [220, 91, 246, 270, 262, 252, 137, 320], [221, 92, 271, 299, 254, 257, 318, 4], [351, 117, 274, 250, 258, 255, 10, 203], [352, 118, 286, 275, 252, 259, 141, 11], [353, 119, 249, 285, 256, 253, 202, 143], [39, 126, 277, 253, 274, 271, 74, 326], [40, 127, 289, 278, 268, 275, 204, 73], [41, 128, 252, 288, 272, 269, 325, 205], [99, 138, 292, 242, 270, 273, 12, 208], [100, 139, 240, 279, 275, 265, 209, 329], [101, 140, 280, 293, 266, 272, 327, 13], [222, 150, 259, 246, 273, 267, 17, 332], [223, 151, 299, 260, 264, 274, 75, 16], [224, 152, 247, 297, 269, 266, 331, 76], [354, 177, 287, 251, 267, 270, 21, 83], [355, 178, 250, 261, 271, 264, 82, 215], [356, 179, 262, 286, 265, 268, 213, 23], [42, 186, 290, 254, 283, 286, 84, 145], [43, 187, 253, 264, 287, 280, 146, 338], [44, 188, 265, 289, 281, 284, 336, 85], [102, 198, 268, 240, 285, 282, 26, 341], [103, 199, 293, 269, 277, 287, 147, 25], [104, 200, 241, 291, 284, 278, 340, 148], [162, 210, 296, 245, 279, 285, 27, 88], [163, 211, 244, 255, 286, 276, 89, 344], [164, 212, 256, 295, 278, 281, 342, 28], [357, 237, 263, 249, 282, 279, 34, 155], [358, 238, 275, 262, 276, 283, 93, 35], [359, 239, 251, 273, 280, 277, 154, 95], [45, 309, 266, 252, 298, 295, 109, 230], [46, 310, 278, 265, 292, 299, 168, 110], [47, 311, 254, 276, 296, 293, 229, 170], [105, 321, 281, 241, 294, 297, 48, 173], [106, 322, 242, 267, 299, 289, 172, 233], [107, 323, 269, 280, 290, 296, 231, 50], [165, 333, 257, 243, 297, 291, 52, 236], [166, 334, 284, 256, 288, 298, 111, 53], [167, 335, 245, 282, 293, 290, 235, 113], [225, 345, 272, 247, 291, 294, 54, 116], [226, 346, 248, 258, 295, 288, 115, 176], [227, 347, 260, 271, 289, 292, 174, 56], [108, 9, 351, 329, 307, 310, 120, 182], [109, 10, 327, 340, 311, 304, 181, 242], [110, 11, 339, 353, 305, 308, 240, 122], [168, 21, 342, 316, 309, 306, 61, 245], [169, 22, 354, 344, 301, 311, 183, 62], [170, 23, 315, 355, 308, 302, 244, 185], [228, 33, 357, 320, 303, 309, 63, 125], [229, 34, 318, 331, 310, 300, 124, 248], [230, 35, 330, 359, 302, 305, 246, 65], [288, 45, 333, 322, 306, 303, 67, 188], [289, 46, 345, 335, 300, 307, 126, 68], [290, 47, 321, 346, 304, 301, 187, 128], [48, 69, 336, 325, 322, 319, 133, 254], [49, 70, 348, 338, 316, 323, 192, 134], [50, 71, 324, 349, 320, 317, 253, 194], [171, 81, 355, 305, 318, 321, 0, 197], [172, 82, 303, 342, 323, 313, 196, 257], [173, 83, 343, 356, 314, 320, 255, 2], [231, 93, 331, 307, 321, 315, 4, 260], [232, 94, 358, 332, 312, 322, 135, 5], [233, 95, 306, 357, 317, 314, 259, 137], [291, 105, 346, 311, 315, 318, 6, 140], [292, 106, 309, 333, 319, 312, 139, 200], [293, 107, 334, 347, 313, 316, 198, 8], [51, 129, 349, 314, 331, 334, 72, 206], [52, 130, 312, 336, 335, 328, 205, 266], [53, 131, 337, 350, 329, 332, 264, 74], [111, 141, 340, 301, 333, 330, 13, 269], [112, 142, 352, 341, 325, 335, 207, 14], [113, 143, 300, 351, 332, 326, 268, 209], [234, 153, 359, 308, 327, 333, 15, 77], [235, 154, 307, 318, 334, 324, 76, 272], [236, 155, 319, 358, 326, 329, 270, 17], [294, 165, 322, 309, 330, 327, 19, 212], [295, 166, 347, 323, 324, 331, 78, 20], [296, 167, 310, 345, 328, 325, 211, 80], [54, 189, 325, 312, 346, 343, 85, 278], [55, 190, 350, 326, 340, 347, 144, 86], [56, 191, 313, 348, 344, 341, 277, 146], [114, 201, 353, 302, 342, 345, 24, 149], [115, 202, 301, 327, 347, 337, 148, 281], [116, 203, 328, 352, 338, 344, 279, 26], [174, 213, 316, 303, 345, 339, 28, 284], [175, 214, 356, 317, 336, 346, 87, 29], [176, 215, 304, 354, 341, 338, 283, 89], [297, 225, 335, 310, 339, 342, 30, 92], [298, 226, 311, 321, 343, 336, 91, 152], [299, 227, 323, 334, 337, 340, 150, 32], [57, 249, 338, 313, 355, 358, 96, 158], [58, 250, 314, 324, 359, 352, 157, 218], [59, 251, 326, 337, 353, 356, 216, 98], [117, 261, 329, 300, 357, 354, 37, 221], [118, 262, 341, 328, 349, 359, 159, 38], [119, 263, 302, 339, 356, 350, 220, 161], [177, 273, 344, 304, 351, 357, 39, 101], [178, 274, 305, 315, 358, 348, 100, 224], [179, 275, 317, 343, 350, 353, 222, 41], [237, 285, 320, 306, 354, 351, 43, 164], [238, 286, 332, 319, 348, 355, 102, 44], [239, 287, 308, 330, 352, 349, 163, 104]];
  const eoTable: number[][] = [[0, 0, 3, 10, 1, 5, 2, 16], [1, 1, 11, 8, 5, 0, 1, 1], [2, 2, 2, 2, 7, 6, 16, 0], [3, 3, 10, 0, 3, 3, 19, 17], [16, 8, 7, 14, 4, 4, 4, 4], [17, 9, 15, 12, 0, 1, 7, 21], [18, 10, 6, 6, 2, 7, 22, 20], [19, 11, 14, 4, 6, 2, 21, 5], [4, 16, 1, 11, 13, 12, 8, 8], [5, 17, 9, 9, 9, 9, 11, 25], [6, 18, 0, 3, 11, 15, 26, 24], [7, 19, 8, 1, 15, 10, 25, 9], [20, 24, 5, 15, 8, 13, 14, 28], [21, 25, 13, 13, 12, 8, 13, 13], [22, 26, 4, 7, 14, 14, 28, 12], [23, 27, 12, 5, 10, 11, 31, 29], [8, 4, 19, 26, 21, 20, 0, 2], [9, 5, 27, 24, 17, 17, 3, 19], [10, 6, 18, 18, 19, 23, 18, 18], [11, 7, 26, 16, 23, 18, 17, 3], [24, 12, 23, 30, 16, 21, 6, 22], [25, 13, 31, 28, 20, 16, 5, 7], [26, 14, 22, 22, 22, 22, 20, 6], [27, 15, 30, 20, 18, 19, 23, 23], [12, 20, 17, 27, 25, 29, 10, 26], [13, 21, 25, 25, 29, 24, 9, 11], [14, 22, 16, 19, 31, 30, 24, 10], [15, 23, 24, 17, 27, 27, 27, 27], [28, 28, 21, 31, 28, 28, 12, 14], [29, 29, 29, 29, 24, 25, 15, 31], [30, 30, 20, 23, 26, 31, 30, 30], [31, 31, 28, 21, 30, 26, 29, 15]];
  const coTable: number[][] = [[27, 54, 9, 18, 3, 6, 1, 2], [28, 55, 10, 19, 4, 7, 2, 0], [29, 56, 11, 20, 5, 8, 0, 1], [30, 57, 12, 21, 6, 0, 4, 5], [31, 58, 13, 22, 7, 1, 5, 3], [32, 59, 14, 23, 8, 2, 3, 4], [33, 60, 15, 24, 0, 3, 7, 8], [34, 61, 16, 25, 1, 4, 8, 6], [35, 62, 17, 26, 2, 5, 6, 7], [36, 63, 18, 0, 12, 15, 10, 11], [37, 64, 19, 1, 13, 16, 11, 9], [38, 65, 20, 2, 14, 17, 9, 10], [39, 66, 21, 3, 15, 9, 13, 14], [40, 67, 22, 4, 16, 10, 14, 12], [41, 68, 23, 5, 17, 11, 12, 13], [42, 69, 24, 6, 9, 12, 16, 17], [43, 70, 25, 7, 10, 13, 17, 15], [44, 71, 26, 8, 11, 14, 15, 16], [45, 72, 0, 9, 21, 24, 19, 20], [46, 73, 1, 10, 22, 25, 20, 18], [47, 74, 2, 11, 23, 26, 18, 19], [48, 75, 3, 12, 24, 18, 22, 23], [49, 76, 4, 13, 25, 19, 23, 21], [50, 77, 5, 14, 26, 20, 21, 22], [51, 78, 6, 15, 18, 21, 25, 26], [52, 79, 7, 16, 19, 22, 26, 24], [53, 80, 8, 17, 20, 23, 24, 25], [54, 0, 36, 45, 30, 33, 28, 29], [55, 1, 37, 46, 31, 34, 29, 27], [56, 2, 38, 47, 32, 35, 27, 28], [57, 3, 39, 48, 33, 27, 31, 32], [58, 4, 40, 49, 34, 28, 32, 30], [59, 5, 41, 50, 35, 29, 30, 31], [60, 6, 42, 51, 27, 30, 34, 35], [61, 7, 43, 52, 28, 31, 35, 33], [62, 8, 44, 53, 29, 32, 33, 34], [63, 9, 45, 27, 39, 42, 37, 38], [64, 10, 46, 28, 40, 43, 38, 36], [65, 11, 47, 29, 41, 44, 36, 37], [66, 12, 48, 30, 42, 36, 40, 41], [67, 13, 49, 31, 43, 37, 41, 39], [68, 14, 50, 32, 44, 38, 39, 40], [69, 15, 51, 33, 36, 39, 43, 44], [70, 16, 52, 34, 37, 40, 44, 42], [71, 17, 53, 35, 38, 41, 42, 43], [72, 18, 27, 36, 48, 51, 46, 47], [73, 19, 28, 37, 49, 52, 47, 45], [74, 20, 29, 38, 50, 53, 45, 46], [75, 21, 30, 39, 51, 45, 49, 50], [76, 22, 31, 40, 52, 46, 50, 48], [77, 23, 32, 41, 53, 47, 48, 49], [78, 24, 33, 42, 45, 48, 52, 53], [79, 25, 34, 43, 46, 49, 53, 51], [80, 26, 35, 44, 47, 50, 51, 52], [0, 27, 63, 72, 57, 60, 55, 56], [1, 28, 64, 73, 58, 61, 56, 54], [2, 29, 65, 74, 59, 62, 54, 55], [3, 30, 66, 75, 60, 54, 58, 59], [4, 31, 67, 76, 61, 55, 59, 57], [5, 32, 68, 77, 62, 56, 57, 58], [6, 33, 69, 78, 54, 57, 61, 62], [7, 34, 70, 79, 55, 58, 62, 60], [8, 35, 71, 80, 56, 59, 60, 61], [9, 36, 72, 54, 66, 69, 64, 65], [10, 37, 73, 55, 67, 70, 65, 63], [11, 38, 74, 56, 68, 71, 63, 64], [12, 39, 75, 57, 69, 63, 67, 68], [13, 40, 76, 58, 70, 64, 68, 66], [14, 41, 77, 59, 71, 65, 66, 67], [15, 42, 78, 60, 63, 66, 70, 71], [16, 43, 79, 61, 64, 67, 71, 69], [17, 44, 80, 62, 65, 68, 69, 70], [18, 45, 54, 63, 75, 78, 73, 74], [19, 46, 55, 64, 76, 79, 74, 72], [20, 47, 56, 65, 77, 80, 72, 73], [21, 48, 57, 66, 78, 72, 76, 77], [22, 49, 58, 67, 79, 73, 77, 75], [23, 50, 59, 68, 80, 74, 75, 76], [24, 51, 60, 69, 72, 75, 79, 80], [25, 52, 61, 70, 73, 76, 80, 78], [26, 53, 62, 71, 74, 77, 78, 79]];

  const setup = () => {
    setupEP();
    setupEO();
    setupCO();
  }

  const isEvenPermutation = (perm: number[]) => {
    let swaps = 0;
    let temp = 0;
    const permCopy = perm.slice();
    for (let i = 0; i < permCopy.length; i++) {
      if (permCopy[i] != i) {
        for (let j = i; j < permCopy.length; j++) {
          if (permCopy[j] == i) {
            temp = permCopy[i];
            permCopy[i] = permCopy[j];
            permCopy[j] = temp;
            swaps++;
            break;
          }
        }
      }
    }
    return swaps % 2 == 0;
  }

  const setupEP = () => {
    permutator([0, 1, 2, 3, 4, 5]).forEach((perm: any) => {
      if (isEvenPermutation(perm)) {
        ep.push(perm);
      }
    })
    for (let i = 0; i < ep.length; i++) {
      epDict[ep[i].toString()] = i;
    }
  }

  const setupEO = () => {
    product([0, 1], 6).forEach((orient: number[]) => {
      if ((orient.reduce((a: number, b: number) => a + b, 0)) % 2 == 0) {
        eo.push(orient);
      }
    })
    for (let i = 0; i < eo.length; i++) {
      eoDict[eo[i].toString()] = i;
    }
  }

  const setupCO = () => {
    product([0, 1, 2], 4).forEach((orient: number[]) => {
      co.push(orient);
    })
    for (let i = 0; i < co.length; i++) {
      coDict[co[i].toString()] = i;
    }
  }

  const stateToId = (state: any) => {
    let idx = 0;
    idx += epDict[state.ep];
    idx += coDict[state.co] * 360;
    idx += eoDict[state.eo] * 29160;
    return idx;
  }

  const idToState = (idx: number) => {
    return {
      ep: ep[idx % 360],
      co: co[Math.floor(idx / 360) % 81],
      eo: eo[Math.floor(idx / 29160) % 32],
    }
  }

  const applyMove = (stateIdx: number, moveIdx: number) => {
    const epIdx = stateIdx % 360;
    const coIdx = Math.floor(stateIdx / 360) % 81;
    const eoIdx = Math.floor(stateIdx / 29160) % 32;

    return epTable[epIdx][moveIdx] + coTable[coIdx][moveIdx] * 360 + eoTable[eoIdx][moveIdx] * 29160;
  }

  const hasProperty = (stateIdx: number, property: mask[]) => {
    const state = idToState(stateIdx);
    return property.some((mask) => mask(state));
  }

  // const groupBySymmetry = (cases: Array<number>) => {
  //   const groups = {};
  //   cases.forEach(
  //     (stateIdx: number) => {
  //       const state = idToState(stateIdx);
  //       let sibling = [1, 2, 0, 3, 4, 5]
  //       sibling = map
  //       const groupName = [state, idToState];

  //       if (
  //   );
  //   const symmetries = [];
  // }

  setup()
  return {
    eo,
    co,
    ep,
    stateToId,
    idToState,
    applyMove,
    hasProperty,
  }
}


const generateGraph = () => {
  const pyra = Pyraminx();
  const graph = [];
  console.log("Generating graph...")
  console.time("Graph generated in")

  for (let i = 0; i < 933120; i++) {
    graph[i] = [-1, pyra.applyMove(i, 0), pyra.applyMove(i, 1), pyra.applyMove(i, 2), pyra.applyMove(i, 3), pyra.applyMove(i, 4), pyra.applyMove(i, 5), pyra.applyMove(i, 6), pyra.applyMove(i, 7)]
  }

  console.timeEnd("Graph generated in")
  console.time("Graph solved in")

  const queue: number[] = [];
  let idx: any = 0;
  let depth = 0;
  let j = 0;
  graph[0][0] = 0;
  queue.push(0);

  while (j < queue.length) {
    idx = queue[j];
    depth = graph[idx][0];
    for (let edge of graph[idx].slice(1)) {
      if (graph[edge][0] == -1) {
        graph[edge][0] = depth + 1;
        queue.push(edge);
      }
    }
    j++;
  }

  console.timeEnd("Graph solved in");

  return graph;
}

const translateRotations = (state: any): Array<any> => {
  const rotations = [
    [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3]], // []
    [[2, 0, 1, 5, 3, 4], [0, 3, 1, 2]], // [U]
    [[1, 2, 0, 4, 5, 3], [0, 2, 3, 1]], // [U']
    [[2, 4, 5, 1, 3, 0], [2, 1, 3, 0]], // [R]
    [[5, 2, 4, 0, 1, 3], [2, 0, 1, 3]], // [R U]
    [[4, 5, 2, 3, 0, 1], [2, 3, 0, 1]], // [R U']
    [[5, 3, 0, 4, 1, 2], [3, 1, 0, 2]], // [R']
    [[0, 5, 3, 2, 4, 1], [3, 2, 1, 0]], // [R' U]
    [[3, 0, 5, 1, 2, 4], [3, 0, 2, 1]], // [R' U']
    [[1, 3, 4, 0, 5, 2], [1, 3, 2, 0]], // [L']
    [[4, 1, 3, 2, 0, 5], [1, 0, 3, 2]], // [L']
    [[3, 4, 1, 5, 2, 0], [1, 2, 0, 3]], // [L']
  ]

  return rotations.map((rotation) => {
    return {
      eo: rotation[0].map((i: number) => state.eo[i]).map((i: number) => state.eo[i]),
      co: rotation[1].map((i: number) => state.co[i]).map((i: number) => state.co[i]),
      ep: rotation[0].map((i: number) => state.ep[i]).map((i: number) => rotation[0].indexOf(i)),
    }
  });
}

type mask = (s: any) => boolean;

export const Properties: { [key: string]: mask[]; } = {
  hasTop: [
    (s: any) => s.ep[0] == 0 && s.ep[1] == 1 && s.ep[2] == 2 && s.eo[0] == 0 && s.eo[1] == 0 && s.eo[2] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // U
    (s: any) => s.ep[1] == 1 && s.ep[3] == 3 && s.ep[4] == 4 && s.eo[1] == 0 && s.eo[3] == 0 && s.eo[4] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // R
    (s: any) => s.ep[2] == 2 && s.ep[4] == 4 && s.ep[5] == 5 && s.eo[2] == 0 && s.eo[4] == 0 && s.eo[5] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // L
    (s: any) => s.ep[0] == 0 && s.ep[3] == 3 && s.ep[5] == 5 && s.eo[0] == 0 && s.eo[3] == 0 && s.eo[5] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // B
  ],
  hasOneFlip: [
    (s: any) => s.ep[0] == 0 && s.ep[1] == 1 && s.ep[2] == 2 && s.eo[0] + s.eo[1] + s.eo[2] == 1 && s.co[0] == 0, // U
    (s: any) => s.ep[1] == 1 && s.ep[3] == 3 && s.ep[4] == 4 && s.eo[1] + s.eo[3] + s.eo[4] == 1 && s.co[1] == 0, // R
    (s: any) => s.ep[2] == 2 && s.ep[4] == 4 && s.ep[5] == 5 && s.eo[2] + s.eo[4] + s.eo[5] == 1 && s.co[2] == 0, // L
    (s: any) => s.ep[0] == 0 && s.ep[3] == 3 && s.ep[5] == 5 && s.eo[0] + s.eo[3] + s.eo[5] == 1 && s.co[3] == 0, // B
  ],
  hasLayer: [
    (s: any) => s.ep[3] == 3 && s.ep[4] == 4 && s.ep[5] == 5 && s.eo[3] == 0 && s.eo[4] == 0 && s.eo[5] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-U
    (s: any) => s.ep[0] == 0 && s.ep[2] == 2 && s.ep[5] == 5 && s.eo[0] == 0 && s.eo[2] == 0 && s.eo[5] == 0 && s.co[0] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-R
    (s: any) => s.ep[0] == 0 && s.ep[1] == 1 && s.ep[3] == 3 && s.eo[0] == 0 && s.eo[1] == 0 && s.eo[3] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[3] == 0, // opp-L
    (s: any) => s.ep[1] == 1 && s.ep[2] == 2 && s.ep[4] == 4 && s.eo[1] == 0 && s.eo[2] == 0 && s.eo[4] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0, // opp-B
  ],
  hasV: [
    (s: any) => s.ep[4] == 4 && s.ep[5] == 5 && s.eo[4] == 0 && s.eo[5] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-U
    (s: any) => s.ep[3] == 3 && s.ep[5] == 5 && s.eo[3] == 0 && s.eo[5] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-U
    (s: any) => s.ep[3] == 3 && s.ep[4] == 4 && s.eo[3] == 0 && s.eo[4] == 0 && s.co[1] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-U
    (s: any) => s.ep[2] == 2 && s.ep[5] == 5 && s.eo[2] == 0 && s.eo[5] == 0 && s.co[0] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-R
    (s: any) => s.ep[0] == 0 && s.ep[5] == 5 && s.eo[0] == 0 && s.eo[5] == 0 && s.co[0] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-R
    (s: any) => s.ep[0] == 0 && s.ep[2] == 2 && s.eo[0] == 0 && s.eo[2] == 0 && s.co[0] == 0 && s.co[2] == 0 && s.co[3] == 0, // opp-R
    (s: any) => s.ep[1] == 1 && s.ep[3] == 3 && s.eo[1] == 0 && s.eo[3] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[3] == 0, // opp-L
    (s: any) => s.ep[0] == 0 && s.ep[3] == 3 && s.eo[0] == 0 && s.eo[3] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[3] == 0, // opp-L
    (s: any) => s.ep[0] == 0 && s.ep[1] == 1 && s.eo[0] == 0 && s.eo[1] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[3] == 0, // opp-L
    (s: any) => s.ep[2] == 2 && s.ep[4] == 4 && s.eo[2] == 0 && s.eo[4] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0, // opp-B
    (s: any) => s.ep[1] == 1 && s.ep[4] == 4 && s.eo[1] == 0 && s.eo[4] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0, // opp-B
    (s: any) => s.ep[1] == 1 && s.ep[2] == 2 && s.eo[1] == 0 && s.eo[2] == 0 && s.co[0] == 0 && s.co[1] == 0 && s.co[2] == 0, // opp-B
  ],
}

export const Graph = generateGraph();

export default Pyraminx;
