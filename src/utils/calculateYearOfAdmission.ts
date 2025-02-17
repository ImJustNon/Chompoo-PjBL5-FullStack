export function calculateYearOfAdmission(studentId: string): string {
    const yearInAD: number = new Date().getFullYear(); // ค.ศ.
    const yearInBE: number = yearInAD + 543; // พ.ศ.
    const first2DigitBE: string = String(yearInBE).slice(0, 2);
    const first2DigitStudentId: string = studentId.slice(0, 2);
    return (first2DigitBE + first2DigitStudentId);
}