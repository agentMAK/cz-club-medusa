import Image from "next/image"

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      <Image
        src="images/cz-logo.png"
        alt="CZ Club Logo"
        height={70}
        width={119}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-blackhan text-4xl font-bold">MEMBERS ONLY</p>
        <button
          type="button"
          className="px-6 py-3 rounded-md text-white text-sm font-blackhan"
        >
          JOIN WAITLIST
        </button>
      </div>
    </main>
  )
}
