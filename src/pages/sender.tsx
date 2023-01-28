import { useCallback, FormEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '../components/Button';

type Props = {};

const SenderPage: NextPage<Props> = ({}: Props) => {
  const { query } = useRouter();
  const onSubmitText = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, [query]);

  return (
    <div className="container mx-auto">
      <div className="py-3">
        <p className="text-xl font-bold">Sender</p>
      </div>
      <form onSubmit={onSubmitText}>
        <div>
          <textarea className="border rounded" id="text" name="text" />
        </div>
        <div>
          <Button type="submit" color="primary">
            Send
          </Button>
          <span className="px-1"></span>
          <Button type="reset" color="secondary">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SenderPage;
