"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateImage = exports.decodeBase64Image = exports.getBillCodePrisma = exports.getGradePoint = exports.getGrade = void 0;
const getGrade = (num, grades) => {
    if (num == null)
        return 'I';
    num = parseFloat(num);
    const vs = grades && grades.find((row) => parseFloat(row.min) <= parseFloat(num) && parseFloat(num) <= parseFloat(row.max));
    console.log(num, vs);
    return (vs && vs.grade) || 'I';
};
exports.getGrade = getGrade;
const getGradePoint = (num, grades) => {
    if (num == null)
        return 'I';
    num = parseFloat(num);
    const vs = grades && grades.find((row) => parseFloat(row.min) <= parseFloat(num) && parseFloat(num) <= parseFloat(row.max));
    return (vs && vs.gradepoint) || 'I';
};
exports.getGradePoint = getGradePoint;
const getBillCodePrisma = (semesterNum) => {
    if ([1, 2].includes(semesterNum))
        return [{ mainGroupCode: { contains: '1000' } }, { mainGroupCode: { contains: '1001' } }, { mainGroupCode: { contains: '1010' } }, { mainGroupCode: { contains: '1100' } }, { mainGroupCode: { contains: '1101' } }, { mainGroupCode: { contains: '1110' } }, { mainGroupCode: { contains: '1111' } }];
    if ([3, 4].includes(semesterNum))
        return [{ mainGroupCode: { contains: '0100' } }, { mainGroupCode: { contains: '0101' } }, { mainGroupCode: { contains: '0110' } }, { mainGroupCode: { contains: '0111' } }, { mainGroupCode: { contains: '1111' } }, { mainGroupCode: { contains: '1110' } }, { mainGroupCode: { contains: '1100' } }];
    if ([5, 6].includes(semesterNum))
        return [{ mainGroupCode: { contains: '0010' } }, { mainGroupCode: { contains: '0011' } }, { mainGroupCode: { contains: '1010' } }, { mainGroupCode: { contains: '1011' } }, { mainGroupCode: { contains: '1111' } }, { mainGroupCode: { contains: '0110' } }, { mainGroupCode: { contains: '0111' } }];
};
exports.getBillCodePrisma = getBillCodePrisma;
const decodeBase64Image = (dataString) => {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
    if (matches.length !== 3)
        return new Error('Invalid input string');
    response.type = matches[1];
    // response.data = new Buffer(matches[2], 'base64');
    response.data = Buffer.from(matches[2], 'base64');
    return response;
};
exports.decodeBase64Image = decodeBase64Image;
const rotateImage = (imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    const Jimp = require('jimp');
    // Reading Image
    const image = yield Jimp.read(imageFile);
    // Checking if any error occurs while rotating image
    image.rotate(90, Jimp.RESIZE_BEZIER, function (err) {
        if (err)
            throw err;
    }).write(imageFile);
});
exports.rotateImage = rotateImage;
