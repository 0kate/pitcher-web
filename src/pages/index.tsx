import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  /* const hello = api.example.hello.useQuery({ text: "from tRPC" }); */

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link href="/receiver">
              <h3 className="text-2xl font-bold text-[hsl(280,100%,70%)]">Receiver</h3>
            </Link>
            <Link href="/sender">
              <h3 className="text-2xl font-bold text-[hsl(280,100%,70%)]">Sender</h3>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
