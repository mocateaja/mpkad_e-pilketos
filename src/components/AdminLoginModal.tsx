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
import { useState } from "react";
import { adminLogin } from "@/utils";
import font from "@/utils/Font";
import { useRouter } from "next/navigation";

interface AdminLoginModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLoginResult: (result: boolean) => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onLoginResult,
}) => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const router = useRouter()

  const handleChangeAdminName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAdminName(event.target.value);
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const login = async() => {
    setError("");
    const loginResult = adminLogin(adminName, password);
    onLoginResult(await loginResult!);
    if (await loginResult) {
      setAdminName("");
      setPassword("");
      onClose();
    } else {
      onLoginResult(false);
      setError("Nama Admin atau Password salah!");
    }
  };

  return (
    <div>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={`${font.primary}`}>Login Admin</ModalHeader>
          <ModalBody pb={6} className={`${font.primary}`}>
            <VStack>
              <Input
                value={adminName}
                onChange={handleChangeAdminName}
                placeholder="Administrator Name"
                type="text"
                size="md"
              />
              <Input
                value={password}
                onChange={handleChangePassword}
                placeholder="Password"
                size="md"
                type="password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                      e.preventDefault();
                      login()
                    }
                  }
                }
              />
              <p className="text-red-500 text-left w-full">{error}</p>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <div className="flex w-full justify-between">
              <Button
                className={`${font.primary}`}
                onClick={()=>router.back()}
                colorScheme="gray"
                mr={3}
              >
                Kembali
              </Button>
              <Button
              className={`${font.primary}`}
              onClick={login}
              colorScheme="blue"
              mr={3}
              >
                Login
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminLoginModal;
