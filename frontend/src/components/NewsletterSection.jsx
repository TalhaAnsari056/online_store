import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Email is required';
  if (!EMAIL_PATTERN.test(trimmed)) return 'Please enter a valid email address';
  return '';
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 1200));
      setEmail('');
      toast.success('Welcome to TRENDORA! Check your inbox for exclusive drops.', {
        duration: 4000,
        style: {
          borderRadius: '9999px',
          background: '#0f172a',
          color: '#f8fafc',
          fontSize: '14px',
        },
      });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    if (error) setError('');
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Exclusive Access
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Join the TRENDORA Community
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Get early access to drops, style edits, and members-only offers.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-6 max-w-xl space-y-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 text-left">
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={isLoading}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'newsletter-error' : undefined}
                className={`h-12 w-full rounded-full border bg-white px-5 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-950 ${
                  error
                    ? 'border-rose-400 focus:border-rose-500 dark:border-rose-500'
                    : 'border-slate-300 focus:border-slate-900 dark:border-slate-700 dark:focus:border-slate-300'
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="h-12 shrink-0 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {error ? (
            <p id="newsletter-error" className="text-left text-xs font-medium text-rose-600 dark:text-rose-400">
              {error}
            </p>
          ) : (
            <p className="text-left text-xs text-slate-500 dark:text-slate-400">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default NewsletterSection;
