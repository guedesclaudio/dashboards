function set(phoneNumber: string): void {
    localStorage.setItem('phoneNumber', phoneNumber);
}

function get(): string | null {
    return localStorage.getItem('phoneNumber');
}

export const storagePhoneNumber = {
    set,
    get
}