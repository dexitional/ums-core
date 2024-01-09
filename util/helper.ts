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