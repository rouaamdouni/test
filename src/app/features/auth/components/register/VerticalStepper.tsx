import { toAbsoluteUrl } from "../../../../../_metronic/helpers"
import ActiveSection from "./ActiveSection"
import CustomSection from "./CustomSection"
export default function VerticalStepper() {
    return (
        <div className="w-lg-650px p-lg-20 mx-auto d-flex flex-column flex-center"
            style={{ backgroundColor: 'transparent' }}
        >
            <div>
                <img src={toAbsoluteUrl('/assets/images/logos/logo.png')} alt='logo_shape' style={{ height: '150px auto', width: '150px ', maxWidth: '100%', marginBottom: '35px' }} />
            </div>
            <div className="d-flex flex-column f">
                <ActiveSection num='1' title='Sign Up' description="Create Your Account" />
                <div style={{ borderLeft: '3px solid #05445E', height: '100px', marginLeft: '10%' }}>{" "}</div>
                <CustomSection num='2' title='Profiling' description="Let's Know About You More" />
                <div style={{ borderLeft: '3px solid #05445E', height: '100px', marginLeft: '10%', opacity: "50%" }}>{" "}</div>
                <CustomSection num='3' title='Payment' description="Get Access To Your Courses" />
            </div>

        </div>
    )
}