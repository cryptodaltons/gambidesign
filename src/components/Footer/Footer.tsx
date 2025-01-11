import footerStyles from './Footer.module.css'
import typographyStyles from '../../styles/Typography.module.css'

export const Footer = () => {
  return (
    <footer
      className={`
        ${footerStyles.footer} 
        grid grid-cols-12 gap-[30px]
        pl-[100px]
        mt-12
        transition-all
        duration-300
        items-center
        z-[999]
      `}
    >
      <div className="col-span-6">
        <p className={typographyStyles['clickable-functional-12']}>© 2025 Gambi. All rights reserved.</p>
      </div>

      <div className="col-span-6 flex justify-end">
        <nav>
          <a href="/privacy" className={typographyStyles['clickable-functional-12']}>
            Privacy Policy
          </a>
          <a href="/terms" className={`ml-[20px] ${typographyStyles['clickable-functional-12']}`}>
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  )
}
