import twi from 'twilio'
import { INVALID_MOBILE_PHONE } from '../../../app/errors/errorTypes'

export const twoFAgenerateCode = async (mobileNumber: string) => {
	if (
		!process.env.VERIFICATION_SID ||
		!process.env.TWILIO_ACCOUNT_SID ||
		!process.env.TWILIO_AUTH_TOKEN
	) {
		throw {
			statusCode: 500,
			message: 'YOU MUST PROVIDE SERVICE ID, ACCOUNT ID AND TOKEN',
		}
	}

	if (!mobileNumber) {
		throw {
			statusCode: 400,
			message: INVALID_MOBILE_PHONE,
		}
	}

	// Send mobile code request to TWILIO
	try {
		const twilio = twi(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
		await twilio.verify
			.services(process.env.VERIFICATION_SID)
			.verifications.create({ to: mobileNumber, channel: 'sms' })
	} catch (error) {
		console.error(error)
		throw {
			statusCode: 500,
			message: error,
		}
	}
}
