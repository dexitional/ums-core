"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGradePoint = exports.getGrade = void 0;
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
