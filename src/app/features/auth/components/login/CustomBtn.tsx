import { ReactNode } from 'react'

type SubmitButtonProps = {
    children: ReactNode
    type: 'submit' | 'button'
    clickHandler?: () => void
}

export default function CustomBtn({ children, type, clickHandler }: SubmitButtonProps) {
    return (
        <button
            type={type}
            onClick={clickHandler}
            style={{ width: '50% ', height: '38px auto', border: '1px solid #05445E', fontSize: '14px', borderRadius: '5px', margin: '5px', backgroundColor: 'transparent', display: 'flex', justifyContent: 'left', alignItems: 'center', paddingLeft: '22px' }}
        >
            {children}
        </button>
    )
}
