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
        className="rounded-3xl shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-[var(--dark-secondary-bg-color)] dark:ring-[var(--dark-outline-color)] dark:hover:ring-[var(--dark-hover-outline-color)]"
      />
    </Link>
  )
}

export default WebsiteLogo
