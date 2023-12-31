import { PropsDataCompany } from "@/@types/data-company";
import { realtimeDatabase } from "@/firebase/firebase";
import { child, get, ref, push, set } from "firebase/database";

export async function getCompanyInfoFromRealtimeDatabase(cnpj: string) {
    try {
        const snapshot = await get(child(ref(realtimeDatabase), '/companies'));
        if (snapshot.exists()) {
            const sessions = snapshot.val();
            const filteredSessions = Object.values(sessions).filter((session: any) => session.cnpj.replace(/[.-/]/g, '').includes(cnpj.replace(/[.-/]/g, '').trim()));
            if (filteredSessions.length > 0) {
                return filteredSessions[0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function recordsDiagnosticInfoInTheDatabaseInRealTime(data: PropsDataCompany) {
    try {
        const novoRegistroRef = push(child(ref(realtimeDatabase), '/companies'));
        await set(novoRegistroRef, data);
    } catch (error) {
        console.log(error);
    }
}