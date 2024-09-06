filename: "RecapitulationCharts.tsx"

```tsx
import ApexCharts from "apexcharts"
import { useEffect, useState } from "react";
import { getCandidatesRecaptulation } from "@/utils"

type CandidateData = {
	id: number,
	name: string,
	position: string,
  total_votes: number
}

const RecapitulationCharts = () => {
  const [recapData, setRecapData] = useState<CandidateData[]>([])
  const [chart, setChart] = useState<any>()
  const [fetchStatus, setFetchStatus] = useState<boolean>(false)

  var dataset = {
    data: [[30, 40, 45, 50, 49, 60, 70, 91, 125], [50, 15, 3, 33, 21, 87, 100, 65, 28]]
  };

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }

  function updateData() {
    let newData_1 = dataset.data[0][dataset.data.length - 1] + getRandomNumber(0, 150);
    dataset.data[0].push(newData_1);
    let newData_2 = dataset.data[1][dataset.data.length - 1] + getRandomNumber(0, 150);
    dataset.data[1].push(newData_2);

    // Perbarui pie chart dengan data terbaru
    chart.updateSeries([dataset.data[0][dataset.data[0].length - 1], dataset.data[1][dataset.data[1].length - 1]]);
  }

  // Inisialisasi pie chart
  var options = {
    series: [dataset.data[0][0], dataset.data[1][0]], // Data awal
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Kukuh Is Fajar', 'Maulana Davis'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  function renderAllCharts() {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    setChart(chart)
    chart.render();
  }

  const reFetch = async() => {
    const recapData = await getCandidatesRecaptulation()
    setRecapData(recapData)
  }
  
  useEffect(() => {
    if (!fetchStatus) {
      (async()=>{
        const recapData = await getCandidatesRecaptulation()
        setRecapData(recapData)
        alert(JSON.stringify(recapData))
        setFetchStatus(true)
      })()
    } else {
      if (recapData.length <= 0) {
        (async()=>{
          await reFetch()
        })
      } else {
        renderAllCharts()
      }
    }
  }, [fetchStatus])

  return(
    <div>
      <button onClick={updateData}>Update</button>
      <div id="chart"/>
    </div>
  )
}

export default RecapitulationCharts
```

Saya menggunakan postgres sebagai koneksi datbase saya, say ingin datanya dikirim melalui streaming atau pipeline stream sehingga datanya akan realtime.

Saya tidak menggunakan library supabase tapi postgres library.
filename: "src/database/connection.ts"

```ts
import postgres from 'postgres';

const { DATABASE_URL } = process.env
 if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
} 
const sql = postgres(DATABASE_URL, {
    ssl: false,
    connect_timeout: 40,
    idle_timeout: 40,
    max_lifetime: 60 * 30,
    onnotice: console.log,
    connection: { statement_timeout: 10000 }
});

export default sql;

```

filename: "src/database/router.ts"

```ts
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

export async function getUsersData({ key }: { [key: string]: string }) {
  try {
    if (key !== "") {
      const result = await sql`
            SELECT
                "e-pilketos_users".id,
                "e-pilketos_users".nis,
                "e-pilketos_users".name,
                "e-pilketos_users".class,
                "e-pilketos_users".vote_status,
                "e-pilketos_users".vote_one,
                "e-pilketos_users".vote_two,
                "e-pilketos_token".token
            FROM
                "e-pilketos_users"
                INNER JOIN "e-pilketos_token" on "e-pilketos_users".nis = "e-pilketos_token".nis
            WHERE
                "e-pilketos_users".nis like '%${key}%'
                OR "e-pilketos_users".name like '%${key}%'
            GROUP BY 
                "e-pilketos_users".id,
                "e-pilketos_users".nis,
                "e-pilketos_users".name,
                "e-pilketos_users".class,
                "e-pilketos_users".vote_status,
                "e-pilketos_users".vote_one,
                "e-pilketos_users".vote_two,
                "e-pilketos_token".token
            `;
      return result;
    } else {
      const result = await sql`
            SELECT
                "e-pilketos_users".id,
                "e-pilketos_users".nis,
                "e-pilketos_users".name,
                "e-pilketos_users".class,
                "e-pilketos_users".vote_status,
                "e-pilketos_users".vote_one,
                "e-pilketos_users".vote_two,
                "e-pilketos_token".token
            FROM
                "e-pilketos_users"
                INNER JOIN "e-pilketos_token" on "e-pilketos_users".nis = "e-pilketos_token".nis
            GROUP BY 
                "e-pilketos_users".id,
                "e-pilketos_users".nis,
                "e-pilketos_users".name,
                "e-pilketos_users".class,
                "e-pilketos_users".vote_status,
                "e-pilketos_users".vote_one,
                "e-pilketos_users".vote_two,
                "e-pilketos_token".token
            `;
      return result;
    }
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
            "e-pilketos_users".id, "e-pilketos_users".nis, "e-pilketos_users".name, "e-pilketos_users".class, "e-pilketos_users".vote_status, "e-pilketos_token".id as token_id
        FROM
            "e-pilketos_users",
            "e-pilketos_token"
        WHERE
            "e-pilketos_users".nis = ${nis}
            AND "e-pilketos_token".token = ${token};
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
    console.log(getTimestamp())
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
        UPDATE "e-pilketos_token" t
        SET used_status = u.vote_status
        FROM "e-pilketos_users" u
        WHERE t.nis = u.nis;
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
```

filename: "src/components/RecapitulationCharts.tsx"