import CryptoJS from 'crypto-js';
export const SECRET_TOKEN = process.env.NEXT_PUBLIC_PRIMARY_TOKEN
const ADMIN = process.env.NEXT_PUBLIC_ADMIN
const ADMINPW = process.env.NEXT_PUBLIC_ADMINPW

//////////////////////////////////////////////////////////////////
// Special function

class LocalStorage {
  private isClient: boolean;

  constructor() {
    this.isClient = typeof window !== 'undefined';
  }

  set<T>(key: string, value: T): void {
    if (this.isClient) {
      try {
        const serializedValue = JSON.stringify(value);
        window.localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }

  get<T>(key: string): T | null {
    if (this.isClient) {
      try {
        const serializedValue = window.localStorage.getItem(key);
        if (serializedValue === null) {
          return null;
        }
        return JSON.parse(serializedValue) as T;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  remove(key: string): void {
    if (this.isClient) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  }
}

export const localStorage = new LocalStorage()

//////////////////////////////////////////////////////////////////
// Unused function

/* 
  function useOpenCloseModal() {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const onOpen = () => setModalOpened(true);
  const onClose = () => setModalOpened(false);

  return { isOpen: modalOpened, onOpen, onClose };
} */

//////////////////////////////////////////////////////////////////
// All function components that work with REST API

export async function getIPAddress() {
  try {
    const response = await fetch("/api/get_ip", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await response.json()
    return result.ip
  } catch (error) {
    console.log(error) // If the development is done let's replace this line of code
  }
}

export async function getUsersData(key: string) {
  const data = {
    key: key
  }
  const encrypted = await encrypt(data, SECRET_TOKEN!)
  const encryptedClientData = {
    data: encrypted
  }
  try {
    const response = await fetch("/api/get_users_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(encryptedClientData)
    })
    const result = await response.json()
    const decrypted = await decrypt(result.data, SECRET_TOKEN!)
    return decrypted
  } catch (error) {
    console.log(error) // If the development is done let's replace this line of code
  }
}

export const whiteList = {
  get: async() => {
    const data = {
      t: "get",
    }
    const encrypted = await encrypt(data, SECRET_TOKEN!)
    const encryptedClientData = {
      data: encrypted
    }
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(encryptedClientData)
      })
      const result = await response.json()
      const decrypted = await decrypt(result.data, SECRET_TOKEN!)
      return decrypted
    } catch (error) {
      console.log(error) // If the development is done let's replace this line of code
      return "failed"
    }
  },
  new: async(ipaddress: string) => {
    const data = {
      t: "new",
      ipaddress: ipaddress
    }
    const encrypted = await encrypt(data, SECRET_TOKEN!)
    const encryptedClientData = {
      data: encrypted
    }
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(encryptedClientData)
      })
      return "success"
    } catch (error) {
      console.log(error) // If the development is done let's replace this line of code
      return "failed"
    }
  },
  delete: async(ipaddress: string) => {
    const data = {
      t: "delete",
      ipaddress: ipaddress
    }
    const encrypted = await encrypt(data, SECRET_TOKEN!)
    const encryptedClientData = {
      data: encrypted
    }
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(encryptedClientData)
      })
      return "success"
    } catch (error) {
      console.log(error) // If the development is done let's replace this line of code
      return "failed"
    }
  }
}

export const getCandidatesData = async() => {
  try {
    const response = await fetch("/api/get_data", {
      method: "GET"
    })
    const result = await response.json()
    const decrypted = await decrypt(result.data, SECRET_TOKEN!)
    return decrypted
  } catch (error) {
    console.log(error) // If the development is done let's replace this line of code
  }
}
export const getCandidatesRecaptulation = async() => {
  try {
    const response = await fetch("/api/get_data", {
      method: "GET"
    })
    const result = await response.json()
    const decrypted = await decrypt(result.data, SECRET_TOKEN!)
    return decrypted
  } catch (error) {
    console.log(error) // If the development is done let's replace this line of code
  }
}

export const clientVoting = async(nis: string, vote_one: number, vote_two: number, token_id: number) => {
  const clientVoteData = {
    nis: nis,
    vote_one: vote_one,
    vote_two: vote_two,
    token_id: token_id
  }
  const encrypted = await encrypt(clientVoteData, SECRET_TOKEN!)
  const encryptedClientData = {
    data: encrypted
  }
  try {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(encryptedClientData)
    })
    const result = await response.json()
    const decrypted = await decrypt(result.data, SECRET_TOKEN!)
    return decrypted
  } catch (error) {
    console.log(error) // If the development is done let's replace this line of code
  }
}

export const clientLogin = async(nis: string, token: string) => {
  const clientData = {
    nis: nis,
    token: token
  }
  const encrypted = await encrypt(clientData, SECRET_TOKEN!)
  const encryptedClientData = {
    data: encrypted
  }
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(encryptedClientData)
    })
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error) // If the development is done let's replace this line of code
  }
}

//////////////////////////////////////////////////////////////////
// Encrypt decrypt function

export const encrypt = async(value: any, secret_token: string) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), secret_token).toString();
    const base64Encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedData));
    return base64Encoded;
  } catch (error) {
    return 'failed';
  }
};
export const decrypt = async(value: any, secret_token: string) => {
  try {
    const base64Decoded = CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
    const decryptedData = CryptoJS.AES.decrypt(base64Decoded, secret_token);
    const finalData = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    return finalData;
  } catch (error) {
    return 'failed';
  }
};

//////////////////////////////////////////////////////////////////
// Get timestamp function

export const getTimestamp = () => {
  const pad = (num: number): string => num.toString().padStart(2, '0');
  const padMilliseconds = (num: number): string => num.toString().padStart(3, '0');

  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = padMilliseconds(date.getMilliseconds());
  const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  return formattedTimestamp
}

export const adminLogin = (name: string, password: string) => {
  if (name === ADMIN && password === ADMINPW) {
    return true
  } else return false
}

//////////////////////////////////////////////////////////////////

/* 
    CODE BELOW IS MADE BY AI CLAUDE AI
    This note is write by myself because this is not my code but i understand about the code below
*/

export class Timer {
  private endDate: Date;
  private intervalId: number | null = null;

  constructor(endDateTime: string) {
    this.endDate = new Date(endDateTime);
  }

  start(callback: (timeLeft: string) => void) {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      this.intervalId = window.setInterval(() => {
        const timeLeft = this.calculateTimeLeft();
        if (timeLeft) {
          callback(this.formatTimeLeft(timeLeft));
        } else {
          this.stop();
          callback("Sudah dibuka!");
        }
      }, 1000);
    }
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private calculateTimeLeft(): { [key: string]: number } | null {
    const difference = this.endDate.getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }

  private formatTimeLeft(timeLeft: { [key: string]: number }): string {
    return `${timeLeft.days}h ${timeLeft.hours}j ${timeLeft.minutes}m ${timeLeft.seconds}d`;
  }
}
