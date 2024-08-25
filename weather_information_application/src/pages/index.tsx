import SearchBar from '../components/SearchBar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Google</title>
        <link rel="icon" href="/google_favicon.ico" /> {/* Link to favicon */}

      </Head>
      <div className="flex flex-col bg-white h-screen">
        <header className="flex justify-end p-2 text-sm text-gray-700"> {/* Reduced padding */}
          <a href="#" className="mr-4">Gmail</a>
          <a href="#" className="mr-4">Images</a>
        </header>
        
        <main className="flex flex-col items-center justify-center flex-grow mt-[-220px]"> {/* Negative margin to reduce space */}
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google Logo"
            width={272} 
            height={92}
            className="h-auto"
          />
          <div className="w-full max-w-md ">
            <SearchBar />
          </div>
        </main>
        
        <footer className="bg-gray-100">
          <div className="flex justify-between px-8 py-2 text-1xl">
            <div>India</div>
          </div>
          <div className="flex justify-between px-4 py-4 text-sm text-black border-t">
            <div>
              <a href="#" className="hover:underline ml-4">Advertising</a>
              <a href="#" className="hover:underline ml-4">Business</a>
              <a href="#" className="hover:underline ml-4">How Search works</a>
            </div>
            <div>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline ml-4">Terms</a>
              <a href="#" className="hover:underline ml-4">Settings</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
