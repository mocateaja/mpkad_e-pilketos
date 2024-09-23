import React, { useEffect, useRef } from "react";
import Image from "next/image";
import font from "@/utils/Font";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { clientVoting, localStorage } from "@/utils";
import LoadingAnimation from "@/components/LoadingAnimation";

type CandidateData = {
  id: number;
  name: string;
  class: string;
  vission: string;
  mission: string;
  position: string;
  imageurl: string;
};

interface CandidatePageProps {
  nis: string;
  token_id: number;
  candidatesData: CandidateData[];
}

const CandidatePage: React.FC<CandidatePageProps> = ({
  nis,
  token_id,
  candidatesData,
}) => {
  const router = useRouter();
  const toast = useToast();
  const [voteSection, setVoteSection] = useState<boolean>(false); // default false
  const [candidateData, setCandidateData] = useState<CandidateData[]>([]);
  const [mitratama, setMitratama] = useState<number>(0);
  const [mitramuda, setMitramuda] = useState<number>(0);
  const [reviewCandidate, setReviewCandidate] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [saveDataStatus, setSaveDataStatus] = useState(false);
  const [error, setError] = useState<string>("");
  const [voteStatus, setVoteStatus] = useState<boolean>(false);
  const cancelRef = useRef(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  function sortCandidatesById(candidates: CandidateData[]): CandidateData[] {
    return candidates.sort((a, b) => a.id - b.id);
  }

  const vote = async () => {
    setError("");
    if (mitratama === 0 || mitramuda === 0) {
      setError("Silahkan pilih kandidat terlebih dahulu!");
    } else if (voteStatus) {
      onClose();
      toast({
        position: "top",
        title: "Error!",
        description: `Anda sudah mencoblos dan tidak dapat mencoblos ulang!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (!voteStatus) {
      const voteResult = await clientVoting(
        nis,
        mitratama,
        mitramuda,
        token_id
      );
      if (voteResult == "request failed!") {
        setError("Gagal mengirim permintaan!");
        onClose();
        toast({
          position: "top",
          title: "Error, gagal mencoblos!",
          description: `Silahkan cek ulang koneksi atau login ulang!`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (voteResult == "request success!") {
        onClose();
        setVoteStatus(true);
        toast({
          position: "top",
          title: "Berhasil mencoblos!",
          description: `Silahkan lanjutkan prosedur setelah pencoblosan`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        localStorage.set("verification_id", `${nis}${mitratama}${mitramuda}${token_id}`)
        setTimeout(() => {
          router.push(`/id/${nis}${mitratama}${mitramuda}${token_id}`);
        }, 6000);
      }
    }
  };

  const saveCandidatesData = async () => {
    const sortedCandidates = await sortCandidatesById(candidatesData);
    setCandidateData(sortedCandidates);
    setSaveDataStatus(true);
  };

  const constCandidateName = [
    ["KUKUH", "Mitratama"],
    ["AFIF", "Mitratama"],
    ["ZAHRAN", "Mitratama"],
    ["SYAHRIL", "Mitramuda"],
    ["IFTITAH", "Mitramuda"],
    ["ESTI", "Mitramuda"],
  ];

  useEffect(() => {
    saveCandidatesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidatesData]);

  const CandidatesComponent = ({ request }: { request: string }) => {
    switch (request) {
      case "image":
        return (
          /* 
					<Image height={0} width={0} src={candidatesData[reviewCandidate-1].imageURL} alt="" className="scale-150"/>
					*/
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ ease: "easeInOut", duration: 0.6, delay: 0 }}
            className="w-full z-10 h-full"
          >
            {candidateData[reviewCandidate - 1]?.imageurl ? (
              <Image
                height={500}
                width={500}
                src={candidateData[reviewCandidate - 1]?.imageurl}
                alt=""
                className="scale-150 w-full h-full"
              />
            ) : null}
          </motion.div>
        );
      case "text":
        return (
          <div className="w-full">
            <h3 className="py-2 text-lg font-semibold select-none">Visi</h3>
            <p className="text-justify select-none leading-normal">
              {candidateData[reviewCandidate - 1] &&
                candidateData[reviewCandidate - 1].vission}
            </p>
            <h3 className="py-2 mt-2 text-lg font-semibold select-none">
              Misi
            </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: (candidateData[reviewCandidate - 1]
                  ? candidateData[reviewCandidate - 1].mission
                  : null)!,
              }}
              className="text-justify select-none leading-normal"
            ></p>
          </div>
        );
      case "name":
        return (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.4 }}
          >
            <h2
              className={`${font.tertiary[800].className} text-[5.4rem] sm:text-[8.5rem] -mt-32 z-10`}
            >
              {constCandidateName[reviewCandidate - 1][0]}
            </h2>
          </motion.div>
        );
      case "position":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.9 }}
          >
            <p className="w-full text-center -mt-32">
              {constCandidateName[reviewCandidate - 1][1]}
            </p>
          </motion.div>
        );
      default:
        break;
    }
  };

  // Due to the limit of time to make this so i make static link for the formal image of the candidates

  return (
    <div
      className={`${font.primary} flex flex-col min-h-screen min-w-screen h-full items-center justify-start text-white`}
    >
      {!saveDataStatus ? (
        <motion.div
          initial={{ opacity: 0, zIndex: 0 }}
          animate={{ opacity: 100, zIndex: 40 }}
          transition={{ ease: "easeInOut", duration: 0.6 }}
        >
          <LoadingAnimation />
        </motion.div>
      ) : (
        ""
      )}
      {!voteSection ? (
        <div className="w-full h-full flex flex-col justify-center items-start">
          <div className="w-full h-48" />
          <div className="w-full h-auto flex flex-col justify-center items-end">
            <div className="w-full h-full p-10">
              <div className="w-full h-full flex flex-col items-center bg-transparent rounded-xl">
                <div className="absolute w-full flex flex-col items-center">
                  <CandidatesComponent request="name" />
                  <CandidatesComponent request="position" />
                </div>
                <div className="absolute -mt-28 w-0 h-0 hidden overflow-x-hidden border-solid border-[9.9rem] border-t-transparent scale-125 border-r-transparent border-b-primary border-l-transparent transform rotate-0"></div>
                <CandidatesComponent request="image" />
              </div>
            </div>
            <div className="absolute z-20 flex justify-center w-full bg-gradient-to-b from-transparent via-secondary to-secondary h-[30rem] mt-72"></div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, zIndex: 0 }}
              animate={{ opacity: 100, zIndex: 40 }}
              transition={{ ease: "easeInOut", duration: 0.6 }}
              className="absolute flex flex-row w-screen h-auto -mt-20 z-30"
            >
              <div className="grow flex justify-center flex-row gap-x-2">
                <div
                  onClick={() => setReviewCandidate(1)}
                  className="w-12 h-12 cursor-pointer bg-quatenary shadow-md rounded-full flex justify-center items-center select-none"
                >
                  <p>1</p>
                </div>
                <div
                  onClick={() => setReviewCandidate(2)}
                  className="w-12 h-12 cursor-pointer bg-quatenary shadow-md rounded-full flex justify-center items-center mt-4 select-none"
                >
                  <p>2</p>
                </div>
                <div
                  onClick={() => setReviewCandidate(3)}
                  className="w-12 h-12 cursor-pointer bg-quatenary shadow-md rounded-full flex justify-center items-center mt-6 select-none"
                >
                  <p>3</p>
                </div>
              </div>
              <div className="grow flex justify-center flex-row gap-x-2">
                <div
                  onClick={() => setReviewCandidate(4)}
                  className="w-12 h-12 cursor-pointer bg-quatenary shadow-md rounded-full flex justify-center items-center mt-6 select-none"
                >
                  <p>1</p>
                </div>
                <div
                  onClick={() => setReviewCandidate(5)}
                  className="w-12 h-12 cursor-pointer bg-quatenary shadow-md rounded-full flex justify-center items-center mt-4 select-none"
                >
                  <p>2</p>
                </div>
                <div
                  onClick={() => setReviewCandidate(6)}
                  className="w-12 h-12 cursor-pointer bg-quatenary shadow-md rounded-full flex justify-center items-center select-none"
                >
                  <p>3</p>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
            className="p-4 w-full flex justify-center items-center -mt-10 z-30"
          >
            <div className="w-full h-auto flex flex-col bg-primary z-20 rounded">
              <div className="bg-secondary w-full h-14 rounded-b-[100%]" />
              <div className="w-full h-auto bg-primary flex flex-col items-center p-6 min-h-72">
                <CandidatesComponent request="text" />
              </div>
              <div className="bg-secondary w-full h-16" />
              <div className="bg-primary -mt-20 w-full h-16 rounded-b-[100%] flex justify-end items-end">
                <Button
                  bg={"white"}
                  className={`${font.primary}`}
                  onClick={() => {
                    setVoteSection(true);
                    scrollToTop();
                  }}
                >
                  Lanjut
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="w-full h-full bg-transparent flex p-3 justify-center items-start">
          <div className="w-full h-auto flex flex-col items-center gap-2">
            <div className="w-full h-28" />
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ ease: "anticipate", duration: 0.8, delay: 0.8 }}
              className="w-full text-lg text-center flex justify-center"
            >
              <h2 className="h-full w-3/4 bg-quatenary py-1 rounded">
                MITRATAMA
              </h2>
            </motion.div>
            <div className="w-full flex gap-x-2">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ duration: 0.8, delay: 0 }}
                onClick={() => setMitratama(1)}
                className={`grow flex justify-start items-end bg-white min-h-40 rounded duration-100 ${
                  mitratama === 1
                    ? "rounded-md border-4 border-solid border-[#6897BB]"
                    : ""
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={"/image/kukuh.png"}
                    layout="fill"
                    quality={100}
                    objectFit="cover"
                    alt="Candidate Image"
                  />
                </div>
                <div className="absolute">
                  <div
                    className={`w-full h-full flex justify-center items-end bottom-0 py-2 px-3 bg-[rgba(155,150,169,0.8)] rounded-tr-lg ${
                      mitratama === 1 ? "bg-[rgb(104,151,187)]" : ""
                    }`}
                  >
                    1
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                onClick={() => setMitratama(2)}
                className={`grow flex justify-start items-end bg-white min-h-40 sm:h-60 rounded duration-100 ${
                  mitratama === 2
                    ? "rounded-md border-4 border-solid border-[#6897BB]"
                    : ""
                }`}
              >
                <div className="grow w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={"/image/afif.png"}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      alt="Candidate Image"
                    />
                  </div>
                </div>
                <div className="absolute">
                  <div
                    className={`w-full h-full flex justify-center items-end bottom-0 py-2 px-3 bg-[rgba(155,150,169,0.8)] rounded-tr-lg ${
                      mitratama === 2 ? "bg-[rgb(104,151,187)]" : ""
                    }`}
                  >
                    2
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={() => setMitratama(3)}
                className={`grow flex justify-start items-end bg-white min-h-40 sm:h-60 rounded duration-100 ${
                  mitratama === 3
                    ? "rounded-md border-4 border-solid border-[#6897BB]"
                    : ""
                }`}
              >
                <div className="grow w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={"/image/zahran.png"}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      alt="Candidate Image"
                    />
                  </div>
                </div>
                <div className="absolute">
                  <div
                    className={`w-full h-full flex justify-center items-end bottom-0 py-2 px-3 bg-[rgba(155,150,169,0.8)] rounded-tr-lg ${
                      mitratama === 3 ? "bg-[rgb(104,151,187)]" : ""
                    }`}
                  >
                    3
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ ease: "anticipate", duration: 0.8, delay: 0.8 }}
              className="w-full text-lg text-center flex justify-center"
            >
              <h2 className="h-full w-3/4 bg-quatenary py-1 rounded">
                MITRAMUDA
              </h2>
            </motion.div>
            <div className="w-full flex gap-x-2">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={() => setMitramuda(4)}
                className={`grow flex justify-start items-end bg-white min-h-40 sm:h-60 rounded duration-100 ${
                  mitramuda === 4
                    ? "rounded-md border-4 border-solid border-[#6897BB]"
                    : ""
                }`}
              >
                <div className="grow w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={"/image/syahril.png"}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      alt="Candidate Image"
                    />
                  </div>
                </div>
                <div className="absolute">
                  <div
                    className={`w-full h-full flex justify-center items-end bottom-0 py-2 px-3 bg-[rgba(155,150,169,0.8)] rounded-tr-lg ${
                      mitramuda === 4 ? "bg-[rgb(104,151,187)]" : ""
                    }`}
                  >
                    1
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                onClick={() => setMitramuda(5)}
                className={`grow flex justify-start items-end bg-white min-h-40 sm:h-60 rounded duration-100 ${
                  mitramuda === 5
                    ? "rounded-md border-4 border-solid border-[#6897BB]"
                    : ""
                }`}
              >
                <div className="grow w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={"/image/iftitah.png"}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      alt="Candidate Image"
                    />
                  </div>
                </div>
                <div className="absolute">
                  <div
                    className={`w-full h-full flex justify-center items-end bottom-0 py-2 px-3 bg-[rgba(155,150,169,0.8)] rounded-tr-lg ${
                      mitramuda === 5 ? "bg-[rgb(104,151,187)]" : ""
                    }`}
                  >
                    2
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ duration: 0.8, delay: 0 }}
                onClick={() => setMitramuda(6)}
                className={`grow flex justify-start items-end bg-white min-h-40 sm:h-60 rounded duration-100 ${
                  mitramuda === 6
                    ? "rounded-md border-4 border-solid border-[#6897BB]"
                    : ""
                }`}
              >
                <div className="grow w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={"/image/esti.png"}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      alt="Candidate Image"
                    />
                  </div>
                </div>
                <div className="absolute">
                  <div
                    className={`w-full h-full flex justify-center items-end bottom-0 py-2 px-3 bg-[rgba(155,150,169,0.8)] rounded-tr-lg ${
                      mitramuda === 6 ? "bg-[rgb(104,151,187)]" : ""
                    }`}
                  >
                    3
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex flex-col justify-end gap-2"
            >
              <p>Dengan ini anda setuju untuk memilih kandidat tersebut.</p>
              <div className="w-full flex justify-between">
                <Button
                  bg={"white"}
                  onClick={() => {
                    setVoteSection(false);
                    scrollToTop();
                  }}
                >
                  Kembali
                </Button>
                <Button bg={"white"} onClick={onOpen} disabled={voteStatus}>
                  Submit
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader className={`${font.primary}`}>
            Vote
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody className={`${font.primary}`}>
            Anda yakin? Ingin memilih kandidat:
            <br />-{" "}
            {candidateData[mitratama - 1] && candidateData[mitratama - 1].name}
            <br />-{" "}
            {candidateData[mitramuda - 1] && candidateData[mitramuda - 1].name}
            <br />
            <p className="text-red-500 text-left w-full">{error}</p>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button className={`${font.primary}`} onClick={onClose}>
              Tidak
            </Button>
            <Button
              className={`${font.primary}`}
              onClick={vote}
              colorScheme="blue"
              ml={3}
            >
              Ya
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CandidatePage;

/* 
	const candidates: CandidateData[] = [
  {
    name: "Kandidat 1",
    class: "Kelas XII IPA 1",
    vission: "Menjadikan OSIS sebagai wadah pengembangan potensi siswa yang inovatif dan berdaya saing.",
    mission: "Mengadakan pelatihan kepemimpinan, mendorong partisipasi dalam kompetisi akademik dan non-akademik, serta memfasilitasi kegiatan sosial kemasyarakatan.",
    videoUrl: "https://example.com/video1.mp4"
  },
  {
    name: "Kandidat 2",
    class: "Kelas XI IPS 2",
    vission: "Menciptakan lingkungan sekolah yang inklusif, kreatif, dan berwawasan lingkungan.",
    mission: "Menyelenggarakan program peduli lingkungan, mendukung kegiatan seni dan budaya, serta mengembangkan sistem komunikasi antar siswa yang efektif.",
    videoUrl: "https://example.com/video2.mp4"
  },
  {
    name: "Kandidat 3",
    class: "Kelas XII IPA 3",
    vission: "Membangun karakter siswa yang berintegritas, berprestasi, dan berjiwa sosial tinggi.",
    mission: "Mengadakan seminar motivasi, membentuk kelompok belajar lintas angkatan, dan menginisiasi program bakti sosial rutin.",
    videoUrl: "https://example.com/video3.mp4"
  },
  {
    name: "Kandidat 4",
    class: "Kelas XI IPA 2",
    vission: "Mewujudkan OSIS sebagai pelopor inovasi dan teknologi dalam kegiatan kesiswaan.",
    mission: "Mengembangkan platform digital untuk kegiatan OSIS, menyelenggarakan workshop teknologi, dan mendorong penggunaan teknologi dalam pembelajaran.",
    videoUrl: "https://example.com/video4.mp4"
  },
  {
    name: "Kandidat 5",
    class: "Kelas XII IPS 1",
    vission: "Membangun jiwa kewirausahaan dan kepemimpinan di kalangan siswa.",
    mission: "Mengadakan bazar kewirausahaan siswa, menyelenggarakan pelatihan public speaking, dan membentuk klub debat sekolah.",
    videoUrl: "https://example.com/video5.mp4"
  },
  {
    name: "Kandidat 6",
    class: "Kelas XI IPA 1",
    vission: "Menjadikan OSIS sebagai jembatan antara siswa, guru, dan masyarakat untuk kemajuan bersama.",
    mission: "Mengadakan forum diskusi rutin antara siswa dan guru, menginisiasi program magang siswa di masyarakat, dan mengorganisir kegiatan bakti sosial lintas sekolah.",
    videoUrl: "https://example.com/video6.mp4"
  }
];
*/
