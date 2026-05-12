'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Phase 1: Console log for now
      console.log('Form submission:', data);

      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      reset();

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');

      // Reset error message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-neutral-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-xl text-neutral-400 mb-16 max-w-2xl">
          Have a project in mind or just want to chat? Feel free to reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Textarea
                label="Message"
                placeholder="Tell me about your project..."
                rows={6}
                error={errors.message?.message}
                {...register('message')}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-accent-500/10 border border-accent-500/20 rounded-lg">
                  <p className="text-accent-400 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again or contact me directly.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Direct Contact Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Direct Contact
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:ashish@example.com"
                className="block p-4 bg-neutral-800 rounded-lg hover:bg-neutral-750 transition-colors duration-200 group"
              >
                <div className="text-sm text-neutral-400 mb-1">Email</div>
                <div className="text-white group-hover:text-accent-400 transition-colors duration-200">
                  ashish@example.com
                </div>
              </a>

              <a
                href="https://github.com/ashishsharma"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-neutral-800 rounded-lg hover:bg-neutral-750 transition-colors duration-200 group"
              >
                <div className="text-sm text-neutral-400 mb-1">GitHub</div>
                <div className="text-white group-hover:text-accent-400 transition-colors duration-200">
                  github.com/ashishsharma
                </div>
              </a>

              <a
                href="https://linkedin.com/in/ashishsharma"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-neutral-800 rounded-lg hover:bg-neutral-750 transition-colors duration-200 group"
              >
                <div className="text-sm text-neutral-400 mb-1">LinkedIn</div>
                <div className="text-white group-hover:text-accent-400 transition-colors duration-200">
                  linkedin.com/in/ashishsharma
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
