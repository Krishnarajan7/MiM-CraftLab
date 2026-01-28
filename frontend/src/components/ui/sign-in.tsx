import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  onBackToHome?: () => void;
  isSignUp?: boolean;
  onToggleMode?: () => void;
}

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial; delay: string }) => (
  <div
    className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-5 shadow-lg max-w-xs"
    style={{
      animation: `testimonialIn 0.6s ${delay} forwards`,
      opacity: 0,
      filter: 'blur(4px)',
      transform: 'translateY(20px) scale(0.95)',
    }}
  >
    <div className="flex items-center gap-3 mb-3">
      <img src={testimonial.avatarSrc} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.handle}</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.text}</p>
  </div>
);

export const SignInPage: React.FC<SignInPageProps> = ({
  title,
  description,
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
  onBackToHome,
  isSignUp = false,
  onToggleMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const defaultTitle = isSignUp ? (
    <>Create your <span className="text-primary">Account</span></>
  ) : (
    <>Welcome <span className="text-primary">Back</span></>
  );

  const defaultDescription = isSignUp
    ? "Join us and start your creative journey today"
    : "Access your account and continue your journey with us";

  return (
    <div className="min-h-screen w-full flex bg-background relative">
      <Link
  to="/"                      
  className="absolute top-6 left-6 lg:left-12 z-20 flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-background/70 backdrop-blur-sm border border-border/50 rounded-full shadow-sm transition-all hover:shadow-md active:scale-95"
>
  <ArrowLeft className="w-4 h-4" />
  <span>Back to Home</span>
</Link>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div
          className="w-full max-w-md mt-4"
          style={{
            animation: 'fadeSlideIn 0.5s 0.1s forwards',
            opacity: 0,
            filter: 'blur(4px)',
            transform: 'translateY(20px)',
          }}
        >
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                {title || defaultTitle}
              </h1>
              <p className="text-muted-foreground">{description || defaultDescription}</p>
            </div>

            <form onSubmit={onSignIn} className="space-y-5">
              {isSignUp && (
                <GlassInputWrapper>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                    />
                  </div>
                </GlassInputWrapper>
              )}

              <GlassInputWrapper>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                  />
                </div>
              </GlassInputWrapper>

              <GlassInputWrapper>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      className="w-full h-12 px-4 pr-12 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </GlassInputWrapper>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="remember"
                      className="w-4 h-4 rounded border-border bg-muted/50 text-primary focus:ring-primary/30"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Keep me signed in
                    </span>
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onResetPassword?.();
                    }}
                    className="hover:underline text-primary transition-colors"
                  >
                    Reset password
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">Or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              onClick={onGoogleSignIn}
              className="w-full h-12 flex items-center justify-center gap-3 bg-card border border-border rounded-xl font-medium text-foreground hover:bg-muted/50 active:scale-[0.98] transition-all duration-200"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account? ' : 'New to our platform? '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onToggleMode) {
                    onToggleMode();
                  } else if (isSignUp) {
                  } else {
                    onCreateAccount?.();
                  }
                }}
                className="text-primary hover:underline transition-colors font-medium"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </a>
            </p>
          </div>
        </div>
      </div>

      {heroImageSrc && (
        <div
          className="hidden lg:flex lg:w-[42%] relative overflow-hidden"
          style={{
            animation: 'slideRightIn 0.6s 0.2s forwards',
            opacity: 0,
            filter: 'blur(4px)',
            transform: 'translateX(20px)',
          }}
        >
          <img
            src={heroImageSrc}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-4">
              {testimonials[0] && <TestimonialCard testimonial={testimonials[0]} delay="0.4s" />}
              {testimonials[1] && (
                <div className="ml-auto">
                  <TestimonialCard testimonial={testimonials[1]} delay="0.6s" />
                </div>
              )}
              {testimonials[2] && <TestimonialCard testimonial={testimonials[2]} delay="0.8s" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};