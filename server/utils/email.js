const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@agom.app';

async function sendInviteEmail(to, token) {
    const activationUrl = `${FRONTEND_URL}/?activate=true&token=${token}`;

    await resend.emails.send({
        from: FROM_EMAIL,
        to,
        subject: 'Invitación a AGOM Autonomy Scanner',
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0c0f1a; color: #e8eaf0; padding: 40px 32px; border-radius: 12px;">
                <div style="margin-bottom: 32px;">
                    <span style="font-size: 1.4rem; font-weight: 700; color: #e8eaf0;">
                        ⚡ AGOM Autonomy Scanner
                    </span>
                </div>
                <h1 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; color: #e8eaf0;">
                    Fuiste invitado/a
                </h1>
                <p style="color: #9ca3b8; margin-bottom: 28px; line-height: 1.6;">
                    Tenés una invitación para acceder a AGOM Autonomy Scanner v2.<br>
                    Hacé clic en el botón para activar tu cuenta y establecer tu contraseña.
                </p>
                <a href="${activationUrl}"
                   style="display: inline-block; background: #6366f1; color: #fff; padding: 14px 28px;
                          text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1rem;
                          margin-bottom: 28px;">
                    Activar mi cuenta →
                </a>
                <p style="color: #636881; font-size: 0.85rem; margin-bottom: 8px;">
                    Este enlace expira en 7 días.
                </p>
                <p style="color: #636881; font-size: 0.85rem;">
                    Si no esperabas esta invitación, podés ignorar este email.
                </p>
                <hr style="border: none; border-top: 1px solid rgba(99,102,241,0.12); margin: 28px 0;" />
                <p style="color: #636881; font-size: 0.75rem;">
                    AGOM Autonomy Scanner — AonikLabs
                </p>
            </div>
        `,
    });
}

module.exports = { sendInviteEmail };
