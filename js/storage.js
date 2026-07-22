// ======= STORAGE =======
// All localStorage read/write lives here

export function getPrograms() {
    return JSON.parse(localStorage.getItem("programs")) || [];
}

export function savePrograms(programs) {
    localStorage.setItem("programs", JSON.stringify(programs));
}

export function getLiftMaxes() {
    return JSON.parse(localStorage.getItem("liftMaxes")) || {};
}

export function saveLiftMaxes(maxes) {
    localStorage.setItem("liftMaxes", JSON.stringify(maxes));
}

export function getUserName() {
    return localStorage.getItem("userName");
}

export function saveUserName(name) {
    localStorage.setItem("userName", name);
}