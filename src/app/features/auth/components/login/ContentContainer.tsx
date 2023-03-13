import { toAbsoluteUrl } from "../../../../../_metronic/helpers";

export default function ContentContainer() {
    return (

        < div className='w-lg-750px d-flex flex-column flex-center rounded p-20 p-lg-5 mx-auto mb-20 ' style={{ backgroundColor: 'transparent' }} >
            <div>
                <img src={toAbsoluteUrl('/assets/images/logos/logo.png')} alt='logo_shape' style={{ height: '180px auto', width: '180px', maxWidth: '100%' }} />
            </div>
            <div className='d-flex flex-column flex-center' style={{ width: '50% auto', textAlign: 'center' }} >
                <div>
                    <span className='text-yellow' style={{ fontFamily: 'Segoe UI', fontSize: '35px', fontWeight: '500' }}>Start Taking Control Of Your Career</span>
                </div>
                <div className=''>
                    <span className='text-dark-blue' style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontWeight: '500', width: '50% auto' }}>
                        Gain practical experience, mentorship and guidance you need
                        <br />
                        to start your new career
                    </span>
                </div>
            </div>
        </div >


    )
}

