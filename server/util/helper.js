"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBillCodePrisma = exports.getGradePoint = exports.getGrade = void 0;
const getGrade = (num, grades) => {
    if (num == null)
        return 'I';
    num = parseFloat(num);
    const vs = grades && grades.find((row) => row.min <= num && num <= row.max);
    return (vs && vs.grade) || 'I';
};
exports.getGrade = getGrade;
const getGradePoint = (num, grades) => {
    if (num == null)
        return 'I';
    num = parseFloat(num);
    const vs = grades && grades.find((row) => row.min <= num && num <= row.max);
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
