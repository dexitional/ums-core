export const getGrade = (num: any,grades: any) => {
    if(num == null) return 'I'
    num = parseFloat(num)
    const vs = grades && grades.find((row: any) => row.min <= num && num <= row.max)
    return (vs && vs.grade) || 'I';
}

export const getGradePoint = (num: any,grades: any) => {
    if(num == null) return 'I'
    num = parseFloat(num)
    const vs = grades && grades.find((row: any) => row.min <= num && num <= row.max)
    return (vs && vs.gradepoint) || 'I';
}

export const getBillCodePrisma = (semesterNum: number,) => {
   if([1,2].includes(semesterNum)) return [{ mainGroupCode: { contains: '1000' }},{ mainGroupCode: { contains: '1001' }},{ mainGroupCode: { contains: '1010' }},{ mainGroupCode: { contains: '1100' }},{ mainGroupCode: { contains: '1101' }},{ mainGroupCode: { contains: '1110' }},{ mainGroupCode: { contains: '1111' }}]
   if([3,4].includes(semesterNum)) return [{ mainGroupCode: { contains: '0100' }},{ mainGroupCode: { contains: '0101' }},{ mainGroupCode: { contains: '0110' }},{ mainGroupCode: { contains: '0111' }},{ mainGroupCode: { contains: '1111' }},{ mainGroupCode: { contains: '1110' }},{ mainGroupCode: { contains: '1100' }}]
   if([5,6].includes(semesterNum)) return [{ mainGroupCode: { contains: '0010' }},{ mainGroupCode: { contains: '0011' }},{ mainGroupCode: { contains: '1010' }},{ mainGroupCode: { contains: '1011' }},{ mainGroupCode: { contains: '1111' }},{ mainGroupCode: { contains: '0110' }},{ mainGroupCode: { contains: '0111' }}]
}