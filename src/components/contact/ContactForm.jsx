import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Send } from 'lucide-react';
import { CONTACT, waLink } from '../../data/site.js';
import { SERVICES } from '../../data/services.js';
import { EASE_OUT } from '../../lib/motion.js';

const INTERESTS = [...SERVICES.map((s) => s.name), 'Just a tour'];
const PHONE_RE = /^[+\d][\d\s-]{9,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {{ name: string, phone: string, email: string }} v
 * @returns {Record<string, string>}
 */
function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please tell us your name.';
  if (!PHONE_RE.test(v.phone.trim())) errors.phone = 'Enter a phone number like 0300 1234567.';
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) errors.email = "That email doesn't look right.";
  return errors;
}

/**
 * @param {{ name: string, phone: string, email: string, message: string }} v
 * @param {string} interest
 */
function buildMessage(v, interest) {
  return [
    "Hi Let's Work!",
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    v.email.trim() && `Email: ${v.email.trim()}`,
    `Interested in: ${interest}`,
    v.message.trim() && `Message: ${v.message.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');
}

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex justify-between text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-graphite">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  'w-full rounded-2xl border border-ink/12 bg-white/70 px-4 py-3.5 outline-none transition-colors placeholder:text-ink/35 focus:border-ink focus:bg-white aria-[invalid=true]:border-red-600';

function errorProps(errors, key) {
  return {
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `cf-${key}-error` : undefined,
  };
}

/** Enquiry form. There is no backend, so it hands the message to WhatsApp (or email) pre-written. */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', phone: '', email: '', message: '' });
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  function update(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`cf-${firstError}`)?.focus();
      return;
    }
    window.open(waLink(buildMessage(values, interest)), '_blank', 'noopener,noreferrer');
    setIsSent(true);
  }

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${interest}`)}&body=${encodeURIComponent(
    buildMessage(values, interest),
  )}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[32px] bg-paper p-6 md:p-9">
      <p className="t-h3">Tell us what you need.</p>
      <p className="mt-1 text-graphite">We'll get back to you on WhatsApp as soon as we can.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label="Your name" error={errors.name}>
          <input id="cf-name" name="name" autoComplete="name" value={values.name} onChange={update} {...errorProps(errors, 'name')} className={inputCls} placeholder="Ayesha Khan" />
        </Field>
        <Field id="cf-phone" label="Phone / WhatsApp" error={errors.phone}>
          <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={update} {...errorProps(errors, 'phone')} className={inputCls} placeholder="0300 1234567" />
        </Field>
        <div className="sm:col-span-2">
          <Field id="cf-email" label="Email" optional error={errors.email}>
            <input id="cf-email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} {...errorProps(errors, 'email')} className={inputCls} placeholder="you@company.com" />
          </Field>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-medium">I'm interested in</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((it) => (
            <label
              key={it}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sun ${
                interest === it ? 'bg-ink text-cream' : 'bg-white/70 hover:bg-white'
              }`}
            >
              <input type="radio" name="interest" value={it} checked={interest === it} onChange={() => setInterest(it)} className="sr-only" />
              {it}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Field id="cf-message" label="Anything else?" optional>
          <textarea id="cf-message" name="message" rows={4} value={values.message} onChange={update} className={`${inputCls} resize-none`} placeholder="Team size, dates, questions…" />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-sun">
          <span className="roll">
            <span>Send on WhatsApp</span>
            <span aria-hidden="true">Send on WhatsApp</span>
          </span>
          <span className="btn-ico">
            <Send size={16} aria-hidden="true" />
          </span>
        </button>
        <a href={mailto} className="ulink text-sm font-medium">
          or send by email
        </a>
      </div>

      <AnimatePresence>
        {isSent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="mt-5 rounded-2xl bg-sun/30 px-4 py-3 text-sm"
          >
            WhatsApp should have opened with your message ready — just press send. If it didn't, call us on {CONTACT.phoneDisplay}.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
