import pgPromise from "pg-promise";

const pgp = pgPromise()
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB')

export async function obterCodigo2FA(cpf) {
    const query = `
        SELECT code
        FROM public."TwoFactorCode" t
        JOIN public."User" u ON u."id" = t."userId"
        WHERE u."cpf" = '${cpf}'
        order by t.id DESC
        limit 1;
    `

    const result = await db.oneOrNone(query)  // funcao que executa uma query que ou retorna 1 registro ou Nulo
    return result.code
}