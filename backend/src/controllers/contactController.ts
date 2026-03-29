import { Request, Response } from 'express';
import { Resend } from 'resend';

export const sendContact = async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, message: 'Email invalide.' });
    return;
  }

  if (message.trim().length < 10) {
    res.status(400).json({ success: false, message: 'Le message doit faire au moins 10 caractères.' });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'maxencemoreau0@gmail.com',
      replyTo: email,
      subject: `[Portfolio] Message de ${name}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    res.status(200).json({ success: true, message: 'Message envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    res.status(500).json({ success: false, message: "Erreur lors de l'envoi du message." });
  }
};
