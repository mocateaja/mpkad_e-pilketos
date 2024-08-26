import font from "@/utils/Font"
import mpk_logo from "@/asset/svg/mpk.svg";
import sman_logo from "@/asset/svg/sman1maos.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer
        className={`bg-primary w-screen text-white py-8 mt-20 shadow-main ${font.primary}`}
      >
        <div className="container mx-auto lg:px-20 md:px-10 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:hidden">
              <h2 className="text-lg font-semibold flex gap-2">
                <Image
                  src={sman_logo}
                  height={50}
                  width={50}
                  alt="Logo SMAN 1 Maos"
                />
                <Image src={mpk_logo} height={50} width={50} alt="Logo MPK" />
              </h2>
            </div>
            <div>
              <div className="hidden md:block mb-4">
                <h2 className="text-lg font-semibold flex gap-2">
                  <Image
                    src={sman_logo}
                    height={50}
                    width={50}
                    alt="Logo SMAN 1 Maos"
                  />
                  <Image src={mpk_logo} height={50} width={50} alt="Logo MPK" />
                </h2>
              </div>
              <h2 className="text-lg font-semibold mb-2">Tentang Kami</h2>
              <p className="text-gray-400">
                Kami adalah Organisasi MPK, Majelis Pewakilan Kelas organization yang berada di SMA Negeri 1
                Maos.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Ikuti Kami</h2>
              <div className="flex space-x-2">
                <a
                  href=""
                  target="_blank"
                  className="text-gray-400 hover:drop-shadow-main hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href=""
                  target="_blank"
                  className="text-gray-400 hover:drop-shadow-main hover:text-white"
                >
                  Facebook
                </a>
                <a
                  href=""
                  target="_blank"
                  className="text-gray-400 hover:drop-shadow-main hover:text-white"
                >
                  Twitter
                </a>
                <a
                  href=""
                  target="_blank"
                  className="text-gray-400 hover:drop-shadow-main hover:text-white"
                >
                  Youtube
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} MPK AD's Project. All rights
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
