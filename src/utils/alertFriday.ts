export function alertFriday(): boolean {
    const weekDay = new Date().getDay();
    if (weekDay === 5) return true;
    return false;
}