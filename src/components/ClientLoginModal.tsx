import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  VStack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import font from "@/utils/Font";
import { clientLogin, parseUserParams } from "@/utils";
import { useSearchParams } from "next/navigation";
import { FaQrcode } from "react-icons/fa6";
/* 
	IMPORTANT NOTE!
	
	Penggunaan NIS disini di artikan sebagai ID! Dapat NIP atau NIS sebab kurangnya perencanaan yang benar-benar
	matang dalam membangun aplikasi ini jadi ada banyak kesahalahan yang kemungkinan di masa depan nanti harus di perbaiki
	Untuk saat ini penulisan NIS digunakan juga untuk guru dan penamaannya diganti menjadi ID agar tidak membuat bingung
	para karyawan dan juga guru serta murid yang ada di SMANJI.
	Perubahan data dan juga penamaan dapat dilakukan namun hal ini membutuhkan waktu yang lama sedangkan hari H sudah dekat
	dan juga perubahan memerlukan ketelitian yang tinggi.
	Itu saja dan ingat catatan ini agar tidak lupa. Sekian terimakasih.
	
	29 September 2024
*/

interface ClientLoginModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLoginResult: (result: boolean) => void;
	onLoginResultData: (id: number, nis: string, name: string, classx: string, vote_status: boolean, token_id: number) => void;
}

type ClientData = {
	id: number,
	nis: string,
	name: string,
	class: string,
	vote_status: boolean,
	token_id: number
}

const ClientLoginModal: React.FC<ClientLoginModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onLoginResult,
	onLoginResultData
}) => {
  const searchParams = useSearchParams()
  const [nisInputValue, setNisInputValue] = useState<string>("");
  const [tokenInputValue, setTokenInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [onRequest, setOnRequest] = useState<boolean>(false) // Default false

  function scanQrCode() {
    
  }

  const handleChangeNisInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setNisInputValue(event.target.value);
  const handleChangeTokenInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setTokenInputValue(event.target.value);

  const loginClient = async() => {
    setOnRequest(true)
		setError("");
    const loginResult: ClientData[] = await clientLogin(nisInputValue, tokenInputValue);
    
    if (typeof loginResult !== "string") {
      if (loginResult.length > 0) {
				const d = loginResult[0]
				if (d.vote_status === true) {
          setOnRequest(false)
					onLoginResult(false);
					setError("Akun ini sudah digunakan untuk mencoblos!")
				} else {
          setOnRequest(false)
          onLoginResultData(d.id,d.nis,d.name,d.class,d.vote_status,d.token_id)
          onClose();
        }
				setNisInputValue("");
				setTokenInputValue("");
			} else {
        setOnRequest(false)
				onLoginResult(false);
				setError("ID atau Token salah!");
			}
    } else {
      setOnRequest(false)
      onLoginResult(false);
      setError("Kesalahan jaringan!");
    }
  };

  useEffect(() => {
    const nisParams: string | null = searchParams.get("nis")
    const tokenParams: string | null = searchParams.get("token")
    if (nisParams !== "" && tokenParams !== "" && nisParams && tokenParams) {
      (async()=>{
        const userNis = await parseUserParams(nisParams)
        const userToken = await parseUserParams(tokenParams)
        setNisInputValue(userNis);
        setTokenInputValue(userToken);
        let fetchStatus = false;
        if (!fetchStatus) {
          (async()=>{
            setError("");
            const loginResult: ClientData[] = await clientLogin(userNis, userToken);
            if (typeof loginResult !== "string") {
              if (loginResult.length > 0) {
                const d = loginResult[0]
                if (d.vote_status === true) {
                  onLoginResult(false);
                  setError("Akun ini sudah digunakan untuk mencoblos!")
                } else {
                  onLoginResultData(d.id,d.nis,d.name,d.class,d.vote_status,d.token_id)
                  onClose();
                }
                setNisInputValue("");
                setTokenInputValue("");
              } else {
                onLoginResult(false);
                setError("NIS atau Token salah!");
              }     
            } else {
              onLoginResult(false);
              setError("Kesalahan jaringan!");
            }
          })()
        }
      })()
    } else {
      null
    }
  }, [])

  return (
    <div>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={`${font.primary}`}>Login Akun</ModalHeader>
          <ModalBody pb={6} className={`${font.primary}`}>
            <VStack>
              <Input
                value={nisInputValue}
                onChange={handleChangeNisInputValue}
                placeholder="NIS"
                type="number"
                size="md"
              />
              <Input
                value={tokenInputValue}
                onChange={handleChangeTokenInputValue}
                placeholder="Token"
                size="md"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                      e.preventDefault();
                      (async() => await loginClient())()
                    }
                  }
                }
              />
              <p className="text-red-500 text-left w-full">{error}</p>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack gap={2}>
              {/* 
              Feature No Ready!
              <IconButton onClick={()=>scanQrCode()} icon={<FaQrcode className='bg-transparent text-white w-full h-full p-2 rounded-lg'/>} className="flex" colorScheme="blue" aria-label={''}/>
               */}
              <Button
                className={`${font.primary}`}
                onClick={async() => await loginClient()}
                colorScheme="blue"
                mr={3}
                isLoading={onRequest}
              >
                Login
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClientLoginModal;
