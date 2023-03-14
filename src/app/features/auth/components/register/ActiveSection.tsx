
type sectionProps = {
    num: string,
    title: string,
    description: string,
}
export default function ActiveSection({ num, title, description }: sectionProps) {
    return (
        <div className="d-flex">
            <div className="rounded"
                style={{ fontFamily: 'Segoe UI', fontWeight: 'bold', color: '#05445E', height: '50px', width: '50px', textAlign: 'center', padding: '10px', fontSize: '20px', border: '2px solid #FFCC29', backgroundColor: '#FFCC29' }} >{num}</div>
            <div className="mx-auto ">
                <div style={{ fontFamily: 'Segoe UI', fontWeight: 'bold', color: '#05445E', fontSize: '18px' }}>{title}</div>
                <div style={{ fontFamily: 'Segoe UI', fontWeight: 'regulat', color: '#05445E', fontSize: '14px' }}>{description}</div>
            </div>
        </div>
    )
}
