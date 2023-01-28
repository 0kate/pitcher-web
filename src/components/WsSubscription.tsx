import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { createConsumer } from '@rails/actioncable';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  sessionId: string;
  onConnected: (sessionId: string) => void;
  onReceived: (text: string) => void;
};

const WsSubscription: FunctionComponent<Props> = ({ sessionId, onConnected, onReceived }: Props) => {
  const [subscription, setSubscription] = useState(undefined);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    subscription.perform('pitch', { sessionId: sessionId, text: form.text.value });

    form.reset();
  }, [subscription, sessionId]);

  useEffect(() => {
    const consumer = createConsumer(process.env.NEXT_PUBLIC_WS_ENDPOINT);
    const newSessionId = uuidv4();
    const subscription = consumer.subscriptions.create({
      channel: 'MessageChannel',
      session_id: newSessionId,
    }, {
      connected() {
        console.log('connected');
        onConnected(newSessionId);
      },
      disconnected() {
        console.log('disconnected');
      },
      received(data) {
        console.log('received');
        console.log(data);

        onReceived(data.content);
      },
    });
    setSubscription(subscription);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input className="border" name="text" />
        <button className="border" type="submit">Send</button>
      </form>
    </div>
  );
};

export default WsSubscription;
