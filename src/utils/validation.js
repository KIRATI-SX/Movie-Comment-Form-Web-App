export function validatEmail(yourEmail){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(yourEmail);
}