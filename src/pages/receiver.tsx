import { useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import QRCode from 'react-qr-code';
import { api } from '../utils/api';

type Props = {};

const ReceiverPage: NextPage<Props> = ({}: Props) => {
  const { data } = api.session.create.useQuery();
  const utils = api.useContext();
  const [inChromeExtension, setInChromeExtension] = useState<boolean>(false);
  const [unreceivedText, setUnreceivedText] = useState<string | undefined>(undefined);

  const senderLink = useMemo(() => {
    return `http://192.168.0.11:3000/sender?session=${data?.sessionId}`;
  }, [data]);

  useEffect(() => {
    if (!data?.sessionId) return;

    const intervalId = setInterval(async () => {
      const unreceived = await utils.text.getUnreceived.fetch({ sessionId: data.sessionId });
      console.log(unreceived);

      if (unreceived.text) {
        setUnreceivedText(unreceived.text);
        clearInterval(intervalId);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [utils, data]);

  useEffect(() => {
    setInChromeExtension(window !== window.parent);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="py-3">
        <p className="text-xl font-bold">Receiver</p>
      </div>

      {!inChromeExtension ? (
        <div>
          <p>Receiver page does not support non-chrome extension environment.</p>
          <p>Please open it on the chrome extension!</p>
        </div>
      ) : (
        <div>
          <p>Session ID: {data?.sessionId}</p>
          <QRCode className="px-2 py-2 mx-auto border border-2" value={senderLink} />

          <div className="py-2"></div>

          <div className="px-2 py-2 border border-2">
            {unreceivedText ? (
              <div>
                <p>Received!</p>
                <p>{unreceivedText}</p>
              </div>
            ) : (
              <div>No received text.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiverPage;
