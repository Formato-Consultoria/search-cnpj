import { PropsDataCompany } from "@/@types/data-company";
import { realtimeDatabase } from "@/firebase/firebase";
import { child, get, ref } from "firebase/database";

export async function getCompanyInfoFromRealtimeDatabase(cnpj: string) {
    try {
        const snapshot = await get(child(ref(realtimeDatabase), '/companies'));
        if (snapshot.exists()) {
            const sessions = snapshot.val();
            const filteredSessions = Object.values(sessions).filter((session: any) => session.cnpj === cnpj);
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