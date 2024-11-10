import { inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { addDoc, collection, Firestore, getDocs, query, doc, setDoc, getDoc, docData, DocumentReference, deleteDoc } from "@angular/fire/firestore";

export class CloudStorageMethods {

    static async saveToCloudMethod(userId: string, firestore: Firestore, title: string, date: string, body: string, uuid: string) {

        const docRef = doc(collection(firestore, `${userId}`));
        await setDoc(docRef, {
            uuid: docRef.id,
            title: title,
            body: body,
            dateTime: date
        });
        console.log("Document written with ID: ", docRef.id);
    }

    static async getCloudJots(firestore: Firestore, userId: string,): Promise<Jot[]> {
        let jots: Jot[] = [];
        let res = await getDocs(query(collection(firestore, userId)))
        let res2: Jot[] = res.docs.map((doc) => doc.data() as Jot)
        for (let i = 0; i < res2.length; i++) {
            jots.push({ title: res2[i].title, body: res2[i].body, dateTime: res2[i].dateTime, uuid: res2[i].uuid, saveToCloud: true })
        }

        return jots
    }

    static async updateCloudJot(firestore: Firestore, newJot: Jot, userId: string,) {
        let docRef = doc(firestore, `${userId}/${newJot.uuid}`);

        await setDoc(docRef, {
            title: newJot.title,
            body: newJot.body,
            dateTime: newJot.dateTime,
            uuid: docRef.id
        })

        console.log("set Doc completed")

    }

    static async deleteCloudJot(firestore: Firestore, uuid: string, userId: string,) {
        let docRef = doc(firestore, `${userId}/${uuid}`);

        await deleteDoc(docRef);

    }

}