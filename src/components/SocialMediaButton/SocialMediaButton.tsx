import styles from './SocialMediaButton.module.css'

interface SocialMediaButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export const SocialMediaButton = ({ icon, onClick, className = '', style }: SocialMediaButtonProps) => {
  return (
    <button className={`${styles.socialMedia} ${className}`} onClick={onClick} style={style}>
      {icon}
    </button>
  )
}
