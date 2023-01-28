import { FormEvent, useCallback } from 'react'
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const SubscriptionComponent = dynamic(() => import('../../components/WsSenderSubscription'), {
  ssr: false,
});

type Props = {};

const WsSenderPage: NextPage<Props> = ({}: Props) => {
  const { query } = useRouter();

  console.log(query);

  return (
    <div>
      <SubscriptionComponent sessionId={query.session} />
    </div>
  );
};

export default WsSenderPage;
