import { useMemo, useState } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import QRCode from 'react-qr-code';

const SubscriptionComponent = dynamic(() => import('../../components/WsSubscription'), {
  ssr: false,
});

type Props = {};

const WsReceiverPage: NextPage<Props> = ({}: Props) => {
  const [receivedText, setReceivedText] = useState<string | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  const senderLink = useMemo(() => {
    const senderLink = `${process.env.NEXT_PUBLIC_SENDER_PAGE_BASE_URL}?session=${sessionId}`;
    console.log(senderLink);
    return senderLink;
  }, [sessionId]);

  return (
    <div>
      <SubscriptionComponent
        sessionId={sessionId}
        onConnected={(sessionId: string) => setSessionId(sessionId)}
        onReceived={setReceivedText}
      />

      <div>Session ID: {sessionId}</div>
      <QRCode value={senderLink} />

      {receivedText ? (
        <div>
          Received! {receivedText}
        </div>
      ) : (
        <div>No received text.</div>
      )}
    </div>
  );
};

export default WsReceiverPage;
