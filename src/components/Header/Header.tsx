import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import headerStyles from './Header.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext'

export const Header = () => {
  const sidebarContext = useSidebarContext()

  return (
    <header
      className={`
        ${headerStyles.header} 
        grid grid-cols-12 gap-[30px]
        ${sidebarContext.isOpen ? 'pl-[240px] sm:pl-[340px]' : 'pl-[60px] sm:pl-[160px]'}
        transition-all
        duration-300
        items-center
        fixed top-0 left-0 w-full
        z-[999]
      `}
    >
      <div className="col-span-2">
        <Logo />
      </div>

      <div className="col-span-10 flex w-full">
        <nav className={`${headerStyles.nav} justify-between sm:justify-end w-full`}>
          <a href="/signin" className={`${typographyStyles['clickable-functional-12']} text-nowrap`}>
            Sign In
          </a>
          <Button label="Register" onClick={() => console.log('Register clicked')} />
        </nav>
      </div>
    </header>
  )
}
