import pgPromise from "pg-promise";

const pgp = pgPromise()
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB')

export async function obterCodigo2FA() {
    const query = `
        SELECT code
        FROM public."TwoFactorCode"
        order by id DESC
        limit 1;
    `

    const result = await db.oneOrNone(query)  // funcao que executa uma query que ou retorna 1 registro ou Nulo
    return result.code
}