import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Subscription, createConsumer } from '@rails/actioncable';

type Props = {
  sessionId: string;
};

const WsSenderSubscription: FunctionComponent<Props> = ({ sessionId }: Props) => {
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subscription)
      return;

    const form = e.target;
    // @ts-ignore
    subscription.perform('pitch', { text: form.text.value, session_id: sessionId });

    // @ts-ignore
    form.reset();
  }, [subscription, sessionId]);

  useEffect(() => {
    if (!sessionId)
      return;

    const consumer = createConsumer(process.env.NEXT_PUBLIC_WS_ENDPOINT);
    const subscription = consumer.subscriptions.create({
      channel: 'MessageChannel',
      session_id: sessionId,
    }, {
      connected() {
        console.log('sender connected');
      },
      disconnected() {},
    });
    setSubscription(subscription);
  }, [sessionId]);

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input className="border" name="text" />
        <button className="border" type="submit">pitch</button>
      </form>
    </div>
  );
};

export default WsSenderSubscription;
