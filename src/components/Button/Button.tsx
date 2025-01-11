import buttonStyles from './Button.module.css'
import typographyStyles from '../../styles/Typography.module.css'

interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  style?: React.CSSProperties
}

export const Button = ({ label, onClick, variant = 'primary', className = '', style }: ButtonProps) => {
  return (
    <button
      className={`${buttonStyles.button} ${variant === 'secondary' ? buttonStyles.secondary : ''} ${
        typographyStyles['functional-12']
      } ${className}`}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  )
}
