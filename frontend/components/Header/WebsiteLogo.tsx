import Image from "next/image"
import PantherLogo from "@/images/panther.png"
import Link from "next/link"

const WebsiteLogo = () => {
  return (
    <Link href="/">
      <Image
        src={PantherLogo}
        alt="Panther holding a dumbbell"
        priority
        width={64}
        height={64}
        className="rounded-3xl shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      />
    </Link>
  )
}

export default WebsiteLogo
