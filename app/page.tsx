import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Background Image Area */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/40 z-10"></div>
          {/* Using a solid color fallback or a high-quality placeholder if available. 
                 For now, a nice gradient placeholder or external URL if allowed.
                 Since I can't guarantee external URLs work perfectly, I'll use a placeholder colored div with a pattern 
                 OR a standard placeholder image service that is consistent. 
                 Better yet, I will simulate a 'campus' look with a CSS pattern + color if I don't have an image.
                 Actually, I will use a placeholder image from Unsplash source for realism in the code, 
                 but comment that it should be replaced.
             */}
          <Image
            src="/images/gajendra_circle.png"
            alt="Gajendra Circle at IIT Madras"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-40 items-center justify-center text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif">
              Celebrating <span className="text-yellow-400">50 Years</span> of <br /> Excellence & Friendship
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 max-w-2xl mx-auto">
              Welcome to the official digital home of the IIT Madras Class of 1971. <br />
              Reconnect, Reminisce, and Rejuvenate with your batchmates.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/directory"
                className="rounded-full bg-iitm-maroon px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:scale-105"
              >
                Find Batchmates
              </Link>
              <Link
                href="/posts/create"
                className="rounded-full bg-white/10 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 ring-1 ring-inset ring-white/50 transition-all backdrop-blur-sm"
              >
                Share a Story <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-iitm-maroon">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Stay Connected to Your Roots
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We've created a space just for the Class of '71 to easily find each other, share life updates, and plan our next big gathering.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">

              {/* Card 1: Directory */}
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  Alumni Directory
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Search and connect with old friends across the globe. Filter by location, industry, or hostel to find your batchmates.</p>
                  <p className="mt-6">
                    <Link href="/directory" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      Browse Directory <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>

              {/* Card 2: Reunions */}
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-iitm-maroon">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Upcoming Reunions
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Golden Jubilee celebrations and regional meetups. Stay updated on where and when the next gathering is happening.</p>
                  <p className="mt-6">
                    <Link href="/posts" className="text-sm font-semibold leading-6 text-iitm-maroon hover:text-red-700">
                      View Events <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>

              {/* Card 3: Memories */}
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-yellow-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  Memories & Stories
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Read nostalgia-filled stories from campus days. Share your own photos and anecdotes from the 70s.</p>
                  <p className="mt-6">
                    <Link href="/posts" className="text-sm font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
                      Read Stories <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>

            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
