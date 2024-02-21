import NavTabs from "./NavTabs"
import ToggleThemeButton from "./ToggleThemeButton"
import WebsiteLogo from "./WebsiteLogo"

const Header = () => {
  return (
    <div className="flex mx-auto items-center justify-center mt-4">
      <WebsiteLogo />
      <NavTabs />
      <ToggleThemeButton />
    </div>
  )
}

export default Header
