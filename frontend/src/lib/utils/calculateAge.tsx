export const calculateAge = (dobString: string): number => {
    if (!dobString) return 0
    const birthDate = new Date(dobString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age > 0 ? age : 0
}