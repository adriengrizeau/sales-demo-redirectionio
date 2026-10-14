import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="wrap">
      <article className="post">
        <h1>Nous écrire</h1>
        <p className="muted">Formulaire de démonstration : rien n'est envoyé.</p>
        <form className="contact" action="/contact" method="get">
          <input name="nom" placeholder="Votre nom" />
          <input name="email" type="email" placeholder="Votre e-mail" />
          <textarea name="message" rows={5} placeholder="Votre message" />
          <button className="btn" type="submit">Envoyer</button>
        </form>
      </article>
    </div>
  );
}
