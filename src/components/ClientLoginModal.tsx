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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import font from "@/utils/Font";
import { clientLogin, parseUserParams } from "@/utils";
import { useSearchParams } from "next/navigation";

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

  const handleChangeNisInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setNisInputValue(event.target.value);
  const handleChangeTokenInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setTokenInputValue(event.target.value);

  const loginClient = async() => {
		setError("");
    const loginResult: ClientData[] = await clientLogin(nisInputValue, tokenInputValue);
    
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
				setError("Nama Admin atau Password salah!");
			}
    } else {
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
  }, [onClose, onLoginResult, onLoginResultData, searchParams])

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
            <Button
              className={`${font.primary}`}
              onClick={async() => await loginClient()}
              colorScheme="blue"
              mr={3}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClientLoginModal;
