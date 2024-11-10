export class LocalStorageMethods {

    static saveLocally(jots: Jot[]) {
        localStorage.setItem("jots", JSON.stringify(jots));
    }

    static getLocally(): Jot[] {
        const localJots = localStorage.getItem("jots");
        if (localJots) {
            return JSON.parse(localJots);
        }
        return [];
    }

}