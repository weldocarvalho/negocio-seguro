import twi from 'twilio'
import { INVALID_MOBILE_PHONE } from '../../../app/errors/errorTypes'

export const twoFAgenerateCode = async (mobilePhone: string) => {
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

	if (!mobilePhone) {
		throw {
			statusCode: 400,
			message: INVALID_MOBILE_PHONE,
		}
	}

	// Request to send the code/token to mobile phone
	try {
		const twilio = twi(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
		await twilio.verify
			.services(process.env.VERIFICATION_SID)
			.verifications.create({ to: mobilePhone, channel: 'sms' })
	} catch (error) {
		console.error(error)
		throw {
			statusCode: 500,
			message: error,
		}
	}
}
