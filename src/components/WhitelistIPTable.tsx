import { 
  Button,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Input,
  VStack,
  useDisclosure,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from 'react';
import font from "@/utils/Font"
import { HiPlus, HiTrash } from "react-icons/hi2";
import { whiteList } from "@/utils";
import { useRouter } from "next/navigation";

interface IPAddress {
  id: number;
  ipaddress: string;
}

const WhitelistIPTable: React.FC = () => {
  const router = useRouter()
  const cancelRef = useRef(null)
  const [data, setData] = useState<IPAddress[]>([])
  const [value, setValue] = useState("")
  const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure()
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure()
  const [modalMessageValue, setModalMessageValue] = useState("")
  const [onRequest, setOnRequest] = useState<boolean>(false) // Default false

  const [error, setError] = useState<string>("")

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  async function addIP() {
    setOnRequest(true)
    const result = await whiteList.new(value);
    result === "success" ? (async() => {
      setOnRequest(false)
      onCloseAddModal()
      const data = await whiteList.get()
      setData(data)
    })() : setError("Gagal menambahkan"); setOnRequest(false)
  }

  async function deleteIP() {
    setOnRequest(true)
    const result = await whiteList.delete(modalMessageValue);
    result === "success" ? (async() => {
      setOnRequest(false)
      onCloseDeleteModal()
      const data = await whiteList.get()
      setData(data)
    })() : setError("Gagal menghapus"); setOnRequest(false)
  }

  useEffect(() => {
    try {
      (async() => {
        const data = await whiteList.get()
        setData(data)
        if (data === null || data === "failed") {
          alert("Terjadi kesalahan. Refresh ulang halaman dan cek koneksi!")
          router.push("/admin")
        }
      })()
    } catch(error) {
      console.error(error)
    }
  }, [router])

  return (
    <div className="w-full md:w-1/2">
      <div className="flex mb-4">
        <h2 className="text-xl font-bold mb-4 w-full text-white">Whitelist IP Address</h2>
        <IconButton aria-label="Add IPAddress to whitelist" onClick={onOpenAddModal} icon={<HiPlus className="scale-100 p-2 rounded-lg bg-white w-full h-full"/>}/>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left w-5">ID</th>
            <th className="border p-2 text-left grow w-full">IP</th>
            <th className="border p-2 text-left max-w-[10px]"></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item) => (
            <tr key={item.id} className='text-white'>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2 grow">{item.ipaddress}</td>
              <td className="border p-2 relative"><IconButton onClick={() => {
                onOpenDeleteModal()
                setModalMessageValue(item.ipaddress)
              }} aria-label="Delete IP Address" icon={<HiTrash className="scale-100 p-2 rounded-lg bg-white w-full h-full"/>}/></td>
            </tr>
          )) : null}
        </tbody>
      </table>
      <Modal closeOnOverlayClick={false} isOpen={isOpenAddModal} onClose={onCloseAddModal}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader className={`${font.primary}`}>Tambah IP Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} className={`${font.primary}`}>
                <VStack>
                    <Input
                        value={value}
                        onChange={handleChangeValue}
                        placeholder='xxx.xxx.xxx.xxx'
                        size='md'
                        type="text"
                    />
                    <p className="text-red-500 text-left w-full">{error}</p>
                </VStack>
            </ModalBody>

            <ModalFooter>
            <Button onClick={addIP} className={`${font.primary}`} colorScheme='blue' mr={3} isLoading={onRequest}>
                Add
            </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        motionPreset='slideInTop'
        onClose={onCloseDeleteModal}
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDeleteModal}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader className={`${font.primary}`}>Hapus IP Address</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody className={`${font.primary}`}>
            Apakah anda yakin untuk menghapus IP Address? dengan alamat: {modalMessageValue}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button className={`${font.primary}`} onClick={onCloseDeleteModal}>
              Tidak
            </Button>
            <Button className={`${font.primary}`} onClick={deleteIP} colorScheme='red' ml={3}>
              Ya
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WhitelistIPTable;