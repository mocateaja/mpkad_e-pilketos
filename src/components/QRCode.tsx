import React, { useEffect, useState } from 'react';
import QrCreator from 'qr-creator';
import { encryptUserParams } from '@/utils';

interface QrCodeProps {
  nis: string;
  token: string;
  identity: number
}

const QrCode: React.FC<QrCodeProps> = ({ nis, token, identity }) => {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    const generateQrUrl = async () => {
      try {
        const encryptedNis = await encryptUserParams(nis);
        const encryptedToken = await encryptUserParams(token);
        const url = `http://192.168.1.70:3000/main?nis=${encryptedNis}&token=${encryptedToken}`;
        setQrUrl(url);
      } catch (error) {
        console.error('Error encrypting parameters:', error);
        setQrUrl('Error generating QR code');
      }
    };

    generateQrUrl();
  }, [nis, token]);

  useEffect(() => {
    if (qrUrl) {
      const qrContainer = document.getElementById(`qr-code-${identity}`);
      if (qrContainer) {
        qrContainer.innerHTML = '';
        QrCreator.render({
          text: qrUrl,
          radius: 1,
          ecLevel: 'H',
          fill: '#5C5470',
          background: null,
          size: 192
        }, qrContainer);
      }
    }
  }, [qrUrl]);

  return <div id={`qr-code-${identity}`} className="w-auto h-auto flex" />;
};

export default QrCode;