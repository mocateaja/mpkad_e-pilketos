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

  const handleChangeAdminName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAdminName(event.target.value);
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const login = () => {
    setError("");
    const loginResult = adminLogin(adminName, password);
    onLoginResult(loginResult!);
    if (loginResult) {
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
              />
              <p className="text-red-500 text-left w-full">{error}</p>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              className={`${font.primary}`}
              onClick={login}
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

export default AdminLoginModal;
