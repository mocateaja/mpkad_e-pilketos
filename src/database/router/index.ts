import { getTimestamp } from "@/utils";
import sql from "../connection";
import CryptoJS from "crypto-js";

/* 
    Buat kode:
    1. Check token dan NIS untuk login ok
    2. Update data users ok
    3. Ambil data kandidat ok
    4. Insert data ke tabel voting_blocks ok
    Done
*/

export async function getVotesInformation() {
  try {
    const total_votes_in = await sql`
          SELECT COUNT(*) as total
          FROM "e-pilketos_users"
          WHERE vote_status = TRUE;
        `;
    const total_votes_remain = await sql`
          SELECT COUNT(*) as total
          FROM "e-pilketos_users"
          WHERE vote_status = FALSE;
    `;
    console.log(total_votes_in)
    const data = {
      in: total_votes_in[0].total,
      remain: total_votes_remain[0].total
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsersData({ key }: { key?: string }) {
  try {
    let query;
    if (key && key.trim() !== "") {
      key.toLowerCase()
      const searchPattern = `%${key}%`;
      query = sql`
        SELECT
          "e-pilketos_users".id,
          "e-pilketos_users".nis,
          "e-pilketos_users".name,
          "e-pilketos_users".class,
          "e-pilketos_token".token
        FROM
          "e-pilketos_users"
          INNER JOIN "e-pilketos_token" ON "e-pilketos_users".nis = "e-pilketos_token".nis
        WHERE
          LOWER("e-pilketos_users".nis) LIKE ${searchPattern}
          OR LOWER("e-pilketos_users".name) LIKE ${searchPattern}
        ORDER BY 
          "e-pilketos_users".id
        LIMIT 20
      `;
    } else {
      query = sql`
        SELECT
          u.id,
          u.nis,
          u.name,
          u.class,
          t.token
        FROM
          "e-pilketos_users" u
          INNER JOIN "e-pilketos_token" t ON u.nis = t.nis
        ORDER BY 
          u.id
        LIMIT 20
      `;
    }

    const result = await query;
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function whiteList({ t, ipaddress }: { [key: string]: string }) {
  switch (t) {
    case "new":
      try {
        await sql`
                INSERT INTO "e-pilketos_whitelist" (ipaddress) VALUES (${ipaddress});
                `;
        return null;
      } catch (error) {
        console.error(error);
      }
      break;
    case "delete":
      try {
        await sql`
                DELETE FROM "e-pilketos_whitelist" WHERE ipaddress = ${ipaddress};
                `;
        return null;
      } catch (error) {
        console.error(error);
      }
      break;
    case "get":
      try {
        const result = await sql`
                SELECT * FROM "e-pilketos_whitelist";
                `;
        return result;
      } catch (error) {
        console.error(error);
      }
      break;
  }
}

export async function login({ nis, token }: { [key: string]: string }) {
  try {
    const result = await sql`
        SELECT
            "e-pilketos_users".id, "e-pilketos_users".nis, "e-pilketos_users".name, "e-pilketos_users".class, "e-pilketos_users".vote_status, "e-pilketos_token".id as token_id, "e-pilketos_token".nis
        FROM
            "e-pilketos_users",
            "e-pilketos_token"
        WHERE
            "e-pilketos_users".nis = ${nis}
            AND "e-pilketos_token".token = ${token}
            AND "e-pilketos_token".nis = ${nis};
        `;
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function insertVotingBlock({
  nis,
  userId,
  vote_one,
  vote_two,
  token_id,
  timestamp,
}: {
  nis: string;
  userId: string;
  vote_one: number;
  vote_two: number;
  token_id: number;
  timestamp: string;
}) {
  try {
    await sql`
        INSERT INTO "e-pilketos_voting_blocks" (nis, user_id, vote_one, vote_two, token_id, timestamp)
        VALUES (${nis}, ${userId}, ${vote_one}, ${vote_two}, ${token_id}, ${timestamp})
        ON CONFLICT (user_id) DO NOTHING;
        `;
  } catch (error) {
    console.error(error);
  }
}

export async function vote({
  nis,
  vote_one,
  vote_two,
  token_id,
}: {
  nis: string;
  vote_one: number;
  vote_two: number;
  token_id: number;
}) {
  const userId = CryptoJS.SHA3(nis, { outputLength: 256 }).toString(
    CryptoJS.enc.Base64
  );
  try {
    console.log(getTimestamp());
    await insertVotingBlock({
      nis: nis,
      userId: userId,
      vote_one: vote_one,
      vote_two: vote_two,
      token_id: token_id,
      timestamp: getTimestamp(),
    });
    await sql`
        UPDATE "e-pilketos_users" 
        SET vote_status = true, vote_one = ${vote_one}, vote_two = ${vote_two}
        WHERE nis = ${nis}
        `;
    await sql`
        UPDATE "e-pilketos_token" 
        SET used_status = true
        WHERE nis = ${nis};
        `;
    return "request success!";
  } catch (error) {
    console.error(error);
    return "request failed!";
  }
}

export async function getCandidatesData() {
  try {
    const result = await sql` 
        SELECT 
            "e-pilketos_candidates".id, "e-pilketos_candidates".name, "e-pilketos_candidates".vission, "e-pilketos_candidates".mission, "e-pilketos_candidates".position, "e-pilketos_candidates".imageurl
        FROM
            "e-pilketos_candidates"
        `;
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCandidatesRecaptulation() {
  try {
    const result = await sql`
        SELECT 
            "e-pilketos_candidates".id, "e-pilketos_candidates".name, "e-pilketos_candidates".position, "e-pilketos_candidates".total_votes
        FROM
            "e-pilketos_candidates"
        `;
    return result;
  } catch (error) {
    console.error(error);
  }
}
